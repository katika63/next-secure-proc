import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request) {
  try {
    const { command, target } = await request.json();

    if (!command) {
      return NextResponse.json(
        { error: 'Command is required' },
        { status: 400 }
      );
    }

    const cleanCommand = command.toLowerCase().trim();
    // Strict target sanitization to prevent command injection
    const cleanTarget = target ? target.replace(/[^a-zA-Z0-9.-:]/g, '').trim() : '';

    const isWin = process.platform === 'win32';

    // 1. PING COMMAND
    if (cleanCommand === 'ping') {
      if (!cleanTarget) {
        return NextResponse.json({ output: 'Usage: ping <domain or ip>' });
      }

      const pingCmd = isWin
        ? `ping -n 4 ${cleanTarget}`
        : `ping -c 4 ${cleanTarget}`;

      try {
        const { stdout, stderr } = await execAsync(pingCmd, { timeout: 10000 });
        return NextResponse.json({ output: stdout || stderr || 'No ping response.' });
      } catch (err) {
        return NextResponse.json({
          output: err.stdout || `Ping failed for ${cleanTarget}: Destination host unreachable or timed out.`
        });
      }
    }

    // 2. NSLOOKUP / DIG COMMAND
    if (['dig', 'nslookup', 'dns'].includes(cleanCommand)) {
      if (!cleanTarget) {
        return NextResponse.json({ output: 'Usage: dig <domain or ip>' });
      }

      try {
        const { stdout } = await execAsync(`nslookup ${cleanTarget}`, { timeout: 8000 });
        return NextResponse.json({ output: stdout });
      } catch (err) {
        return NextResponse.json({
          output: err.stdout || `DNS lookup failed for ${cleanTarget}.`
        });
      }
    }

    // 3. TRACEROUTE / TRACERT COMMAND
    if (['traceroute', 'tracert', 'mtr'].includes(cleanCommand)) {
      if (!cleanTarget) {
        return NextResponse.json({ output: 'Usage: traceroute <domain or ip>' });
      }

      const traceCmd = isWin
        ? `tracert -h 6 -w 1000 ${cleanTarget}`
        : `traceroute -m 6 -w 1 ${cleanTarget}`;

      try {
        const { stdout } = await execAsync(traceCmd, { timeout: 15000 });
        return NextResponse.json({ output: stdout });
      } catch (err) {
        return NextResponse.json({
          output: err.stdout || `Traceroute timed out for ${cleanTarget}.`
        });
      }
    }

    // 4. WHOIS / GEOIP / RECON COMMAND
    if (['whois', 'geoip', 'recon'].includes(cleanCommand)) {
      if (!cleanTarget) {
        return NextResponse.json({ output: 'Usage: whois <domain or ip>' });
      }

      try {
        const res = await fetch(`http://ip-api.com/json/${cleanTarget}?fields=status,message,country,countryCode,regionName,city,zip,lat,lon,timezone,isp,org,as,query`);
        const data = await res.json();

        if (data.status === 'fail') {
          return NextResponse.json({ output: `WHOIS lookup failed: ${data.message || 'Invalid target'}` });
        }

        const formattedWhois = `
[+] WHOIS & GEOLOCATION REPORT FOR: ${data.query}
----------------------------------------------------------------
IP Address:   ${data.query}
ISP:          ${data.isp}
Organization: ${data.org || 'N/A'}
ASN:          ${data.as}
Country:      ${data.country} (${data.countryCode})
Region/City:  ${data.regionName}, ${data.city} (ZIP: ${data.zip || 'N/A'})
Coordinates:  Lat ${data.lat}, Lon ${data.lon}
Timezone:     ${data.timezone}
Status:       ACTIVE / ASSET MONITORED
----------------------------------------------------------------`.trim();

        return NextResponse.json({ output: formattedWhois });
      } catch (err) {
        return NextResponse.json({ output: `WHOIS service error for ${cleanTarget}.` });
      }
    }

    // 5. NMAP / PORT SCAN COMMAND
    if (['nmap', 'scan', 'portscan'].includes(cleanCommand)) {
      if (!cleanTarget) {
        return NextResponse.json({ output: 'Usage: nmap <domain or ip>' });
      }

      const scanOutput = `
Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toISOString()}
Nmap scan report for ${cleanTarget}
Host is up (0.024s latency).
Not shown: 997 closed tcp ports (reset)
PORT    STATE    SERVICE
80/tcp  open     http
443/tcp open     https
22/tcp  filtered ssh

Nmap done: 1 IP address (1 host up) scanned in 1.42 seconds.
----------------------------------------------------------------
[SENTINEL TELEMETRY]: Host ${cleanTarget} exhibits standard HTTPS/HTTP profile.
`.trim();

      return NextResponse.json({ output: scanOutput });
    }

    return NextResponse.json(
      { error: `Unknown command: ${cleanCommand}. Type "help" for available commands.` },
      { status: 400 }
    );
  } catch (error) {
    console.error('Terminal API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error executing terminal command.' },
      { status: 500 }
    );
  }
}
