import { NextResponse } from 'next/server';

interface ExposureItem {
  id: string;
  category: 'Transport' | 'Email' | 'Headers' | 'Perimeter';
  title: string;
  status: 'passed' | 'warning' | 'critical' | 'info';
  description: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    let rawDomain = (body.domain || '').trim().toLowerCase();

    // Clean protocol, path, and port if user pasted a full URL
    rawDomain = rawDomain
      .replace(/^https?:\/\//i, '')
      .replace(/\/.*$/, '')
      .replace(/:\d+$/, '')
      .trim();

    // Validate domain format
    const domainRegex = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/i;
    if (!rawDomain || !domainRegex.test(rawDomain)) {
      return NextResponse.json(
        { error: 'Please enter a valid domain name (e.g. example.com or mycompany.io).' },
        { status: 400 }
      );
    }

    // Run parallel DNS & Network telemetry checks
    const [dnsARes, dnsMxRes, dnsTxtRes, dnsDmarcRes, httpCheckRes] = await Promise.allSettled([
      // 1. A Records (IP address)
      fetch(`https://dns.google/resolve?name=${encodeURIComponent(rawDomain)}&type=A`, {
        signal: AbortSignal.timeout(4000),
      }).then((r) => r.json()),

      // 2. MX Records (Mail servers)
      fetch(`https://dns.google/resolve?name=${encodeURIComponent(rawDomain)}&type=MX`, {
        signal: AbortSignal.timeout(4000),
      }).then((r) => r.json()),

      // 3. SPF / Root TXT Records
      fetch(`https://dns.google/resolve?name=${encodeURIComponent(rawDomain)}&type=TXT`, {
        signal: AbortSignal.timeout(4000),
      }).then((r) => r.json()),

      // 4. DMARC TXT Record (_dmarc.domain)
      fetch(`https://dns.google/resolve?name=_dmarc.${encodeURIComponent(rawDomain)}&type=TXT`, {
        signal: AbortSignal.timeout(4000),
      }).then((r) => r.json()),

      // 5. HTTPS Header & Security Handshake
      fetch(`https://${rawDomain}`, {
        method: 'HEAD',
        redirect: 'follow',
        signal: AbortSignal.timeout(4500),
        headers: {
          'User-Agent': 'BTMSecurity-AttackSurfaceScanner/1.0 (+https://www.btmsec.com)',
        },
      }),
    ]);

    // 1. Process IP & DNS
    let ip = 'N/A';
    const aAnswers = dnsARes.status === 'fulfilled' && dnsARes.value ? dnsARes.value.Answer || [] : [];
    const validARecord = aAnswers.find((a: { type: number; data: string }) => a.type === 1 && a.data);
    if (validARecord) {
      ip = validARecord.data;
    }

    // 2. Process MX (Mail Exchangers)
    const mxAnswers = dnsMxRes.status === 'fulfilled' && dnsMxRes.value ? dnsMxRes.value.Answer || [] : [];
    const hasMx = mxAnswers.length > 0;
    const mxHosts = mxAnswers.map((m: { data: string }) => m.data).slice(0, 3);

    // 3. Process SPF
    const txtAnswers = dnsTxtRes.status === 'fulfilled' && dnsTxtRes.value ? dnsTxtRes.value.Answer || [] : [];
    const spfRecord = txtAnswers.find((t: { data: string }) =>
      t.data && t.data.toLowerCase().includes('v=spf1')
    );
    const hasSpf = Boolean(spfRecord);

    // 4. Process DMARC
    const dmarcAnswers = dnsDmarcRes.status === 'fulfilled' && dnsDmarcRes.value ? dnsDmarcRes.value.Answer || [] : [];
    const dmarcRecord = dmarcAnswers.find((d: { data: string }) =>
      d.data && d.data.toLowerCase().includes('v=dmarc1')
    );
    const hasDmarc = Boolean(dmarcRecord);
    let dmarcPolicy = 'none';
    if (dmarcRecord && dmarcRecord.data) {
      const match = dmarcRecord.data.match(/p=([a-z]+)/i);
      if (match) {
        dmarcPolicy = match[1].toLowerCase();
      }
    }

    // 5. Process HTTPS & Security Headers
    let httpsOk = false;
    let hsts = false;
    let csp = false;
    let xFrameOptions = false;
    let xContentTypeOptions = false;
    let serverBanner = '';

    if (httpCheckRes.status === 'fulfilled') {
      const res = httpCheckRes.value;
      httpsOk = true;
      const headers = res.headers;

      hsts = Boolean(headers.get('strict-transport-security'));
      csp = Boolean(headers.get('content-security-policy'));
      xFrameOptions = Boolean(headers.get('x-frame-options'));
      xContentTypeOptions = Boolean(headers.get('x-content-type-options'));
      serverBanner = headers.get('server') || '';
    }

    // Try to get ASN / ISP org if IP is resolved
    let hostOrg = 'Enterprise Cloud / Dedicated Host';
    let country = 'Global';
    if (ip !== 'N/A') {
      try {
        const geoRes = await fetch(`https://ipapi.co/${ip}/json/`, {
          signal: AbortSignal.timeout(2000),
        });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.org) hostOrg = geoData.org;
          if (geoData.country_name) country = geoData.country_name;
        }
      } catch {
        // Fallback gracefully without blocking
      }
    }

    // 6. Calculate Attack Surface Score & Exposures
    let score = 100;
    const exposures: ExposureItem[] = [];

    // Transport & HTTPS
    if (httpsOk) {
      exposures.push({
        id: 'https-ok',
        category: 'Transport',
        title: 'TLS / HTTPS Transport Encrypted',
        status: 'passed',
        description: 'Modern TLS encryption protects traffic in transit to external users.',
      });
    } else {
      score -= 25;
      exposures.push({
        id: 'https-fail',
        category: 'Transport',
        title: 'HTTPS Connection Failed or Unreachable',
        status: 'critical',
        description: 'Web service did not respond over HTTPS within the threshold, or SSL certificate is invalid.',
      });
    }

    // HSTS (HTTP Strict Transport Security)
    if (hsts) {
      exposures.push({
        id: 'hsts-ok',
        category: 'Headers',
        title: 'HSTS Enforcement Active',
        status: 'passed',
        description: 'Strict-Transport-Security header enforces HTTPS against downgrade and SSL-stripping attacks.',
      });
    } else {
      score -= 15;
      exposures.push({
        id: 'hsts-missing',
        category: 'Headers',
        title: 'Missing HSTS Security Header',
        status: 'warning',
        description: 'Absence of HSTS allows attackers to intercept initial plaintext HTTP requests and downgrade connections.',
      });
    }

    // Email Security (DMARC & SPF)
    if (hasDmarc) {
      if (dmarcPolicy === 'reject' || dmarcPolicy === 'quarantine') {
        exposures.push({
          id: 'dmarc-enforced',
          category: 'Email',
          title: `DMARC Policy Enforced (${dmarcPolicy.toUpperCase()})`,
          status: 'passed',
          description: `Unauthorized senders attempting to impersonate @${rawDomain} are actively blocked or quarantined.`,
        });
      } else {
        score -= 10;
        exposures.push({
          id: 'dmarc-monitoring',
          category: 'Email',
          title: 'DMARC in Monitoring Mode Only (p=none)',
          status: 'warning',
          description: 'DMARC is published but set to "none", meaning spoofed phishing emails can still reach recipient inboxes.',
        });
      }
    } else {
      score -= 20;
      exposures.push({
        id: 'dmarc-missing',
        category: 'Email',
        title: 'No DMARC Record Found (Domain Spoofing Risk)',
        status: 'critical',
        description: `Attackers can forge phishing emails originating from @${rawDomain} without cryptographic policy rejection.`,
      });
    }

    if (hasSpf) {
      exposures.push({
        id: 'spf-ok',
        category: 'Email',
        title: 'SPF Authentication Record Configured',
        status: 'passed',
        description: 'Authorized sending mail servers are explicitly designated via DNS TXT records.',
      });
    } else if (hasMx) {
      score -= 10;
      exposures.push({
        id: 'spf-missing',
        category: 'Email',
        title: 'Missing SPF Record on Mail-Enabled Domain',
        status: 'warning',
        description: 'Domain has active MX mail servers but lacks an SPF policy defining authorized senders.',
      });
    }

    // Content Security Policy (CSP)
    if (csp) {
      exposures.push({
        id: 'csp-ok',
        category: 'Headers',
        title: 'Content Security Policy (CSP) Detected',
        status: 'passed',
        description: 'Restricts untrusted script execution, mitigating Cross-Site Scripting (XSS) attacks.',
      });
    } else {
      score -= 10;
      exposures.push({
        id: 'csp-missing',
        category: 'Headers',
        title: 'Missing Content Security Policy (CSP)',
        status: 'warning',
        description: 'No CSP header detected. Browsers will execute any inline script injected via vulnerabilities.',
      });
    }

    // Clickjacking & Frameguard
    if (xFrameOptions) {
      exposures.push({
        id: 'frame-ok',
        category: 'Headers',
        title: 'Clickjacking Protection (X-Frame-Options)',
        status: 'passed',
        description: 'Prevents adversaries from embedding your portal in hidden malicious frames.',
      });
    } else {
      score -= 10;
      exposures.push({
        id: 'frame-missing',
        category: 'Headers',
        title: 'Missing Clickjacking Protection',
        status: 'warning',
        description: 'X-Frame-Options header not found. Portions of your application may be framable in third-party contexts.',
      });
    }

    // MIME Sniffing protection
    if (xContentTypeOptions) {
      exposures.push({
        id: 'sniff-ok',
        category: 'Headers',
        title: 'MIME Sniffing Prevention Active',
        status: 'passed',
        description: 'X-Content-Type-Options: nosniff prevents browsers from interpreting non-script assets as executable code.',
      });
    }

    // Server Banner Information Disclosure
    if (serverBanner && serverBanner.length > 3) {
      score -= 5;
      exposures.push({
        id: 'server-banner',
        category: 'Perimeter',
        title: `Server Header Disclosed: "${serverBanner}"`,
        status: 'info',
        description: 'Revealing the web server and version in response headers aids threat actors in reconnaissance.',
      });
    }

    // Clamp score
    score = Math.max(25, Math.min(100, score));

    // Grade calculation
    let grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' = 'A';
    let riskLevel: 'Minimal' | 'Low' | 'Moderate' | 'Elevated' | 'High' = 'Low';
    if (score >= 95) {
      grade = 'A+';
      riskLevel = 'Minimal';
    } else if (score >= 85) {
      grade = 'A';
      riskLevel = 'Low';
    } else if (score >= 70) {
      grade = 'B';
      riskLevel = 'Moderate';
    } else if (score >= 55) {
      grade = 'C';
      riskLevel = 'Elevated';
    } else if (score >= 40) {
      grade = 'D';
      riskLevel = 'High';
    } else {
      grade = 'F';
      riskLevel = 'High';
    }

    return NextResponse.json({
      domain: rawDomain,
      scannedAt: new Date().toISOString(),
      score,
      grade,
      riskLevel,
      network: {
        ip,
        hostOrg,
        country,
        hasMx,
        mxHosts,
      },
      securityProfile: {
        httpsOk,
        hsts,
        hasSpf,
        hasDmarc,
        dmarcPolicy,
        csp,
        xFrameOptions,
        xContentTypeOptions,
        serverBanner,
      },
      exposures,
    });
  } catch (error) {
    console.error('Attack surface scan error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during security reconnaissance. Please try again.' },
      { status: 500 }
    );
  }
}
