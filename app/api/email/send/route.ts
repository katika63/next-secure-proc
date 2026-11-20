import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { resend } from '@/lib/resend'

// ---------------------------------------------------------------------------
// Email Signatures (HTML & Plain Text)
// ---------------------------------------------------------------------------
const EMAIL_SIGNATURE_TEMPLATE = `
<table cellpadding="0" cellspacing="0" border="0" width="620"
style="width:100%;max-width:620px;background:#ffffff;
font-family:Arial,Helvetica,sans-serif;color:#0b1428;
border-collapse:collapse;">

  <tr>
    <td style="padding:20px;background:#ffffff;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>

          <!-- HARDCODED BTMSecurity LOGO -->
          <td width="175" valign="middle"
          style="width:175px;padding-right:18px;
          border-right:3px solid #1677ed;">

            <table cellpadding="0" cellspacing="0"
            border="0" width="100%">
              <tr>
                <td align="center"
                style="background:#0b1428;padding:13px 5px 10px;
                border-bottom:4px solid #12b8ed;">

                  <div style="font-size:34px;font-weight:900;
                  letter-spacing:-2px;line-height:1.1;
                  color:#ffffff;">
                    BTM<span style="color:#12b8ed;">.</span>
                  </div>

                  <div style="font-size:12px;font-weight:bold;
                  letter-spacing:4px;color:#ffffff;
                  margin-top:5px;">
                    SECURITY
                  </div>

                </td>
              </tr>

              <tr>
                <td align="center"
                style="padding-top:10px;font-size:9px;
                font-weight:bold;letter-spacing:1.5px;
                color:#1677ed;">
                  DETECT · DEFEND · THRIVE
                </td>
              </tr>
            </table>
          </td>

          <!-- CONTACT DETAILS -->
          <td valign="middle" style="padding-left:20px;">

            <div style="font-size:23px;font-weight:bold;
            line-height:1.3;color:#0b1428;">
              {{full_name}}
            </div>

            <div style="font-size:14px;font-weight:bold;
            color:#1677ed;padding-top:3px;">
              {{job_title}}
            </div>

            <div style="font-size:12px;color:#64748b;
            padding-top:4px;">
              Blue Team Module Security
            </div>

            <div style="height:1px;background:#dce6f2;
            margin:12px 0;"></div>

            <table cellpadding="0" cellspacing="0" border="0"
            style="font-size:12px;line-height:2;color:#0b1428;">

              <tr>
                <td style="font-weight:bold;padding-right:9px;">
                  WEB
                </td>
                <td>
                  <a href="https://www.btmsec.com"
                  style="color:#1677ed;text-decoration:none;">
                    www.btmsec.com
                  </a>
                </td>
              </tr>

              <tr>
                <td style="font-weight:bold;padding-right:9px;">
                  EMAIL
                </td>
                <td>
                  <a href="mailto:{{email}}"
                  style="color:#1677ed;text-decoration:none;">
                    {{email}}
                  </a>
                </td>
              </tr>

              <tr>
                <td style="font-weight:bold;padding-right:9px;">
                  LOCATION
                </td>
                <td style="color:#0b1428;">
                  Global Operation
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- BRAND POSITIONING -->
  <tr>
    <td style="padding:4px 20px 17px;background:#ffffff;">

      <div style="font-size:14px;font-weight:bold;
      letter-spacing:0.4px;color:#1677ed;">
        CYBERSECURITY. INTELLIGENCE. RESILIENCE.
      </div>

      <div style="font-size:11px;line-height:1.7;
      color:#475569;padding-top:5px;">
        AI-Powered Security Operations · Threat Intelligence ·
        Vulnerability Assessment · Security Research
      </div>

    </td>
  </tr>

  <!-- FOOTER -->
  <tr>
    <td style="background:#0b1428;
    border-top:3px solid #12b8ed;padding:14px 20px;">

      <div style="font-size:13px;font-weight:bold;
      letter-spacing:0.7px;color:#ffffff;">
        GLOBAL REACH
        <span style="color:#12b8ed;">
          · AFRICAN PRIORITY
        </span>
      </div>

      <div style="font-size:11px;color:#cbd5e1;
      padding-top:6px;">
        Building a safer and more resilient digital world.
      </div>

      <div style="font-size:9px;color:#64748b;
      padding-top:9px;">
        © BTMSecurity | Blue Team Module Security
      </div>

    </td>
  </tr>

</table>
`;

const SENDER_METADATA: Record<string, { fullName: string; jobTitle: string }> = {
  "security@research.btmsec.com": {
    fullName: "BTM Security Operations",
    jobTitle: "AI-Powered Cyber Defense & SecOps",
  },
  "disclosure@research.btmsec.com": {
    fullName: "BTM Vulnerability Disclosure",
    jobTitle: "Coordinated Vulnerability Research",
  },
  "advisory@research.btmsec.com": {
    fullName: "BTM Threat Advisory",
    jobTitle: "Threat Intelligence & Security Research",
  },
}

function renderEmailSignature(params: {
  fullName?: string
  jobTitle?: string
  email: string
  from: string
}): string {
  const fallback = SENDER_METADATA[params.from] || {
    fullName: "BTM Security Operations",
    jobTitle: "AI-Powered Cyber Defense",
  }

  const name = params.fullName?.trim() || fallback.fullName
  const title = params.jobTitle?.trim() || fallback.jobTitle
  const emailAddr = params.email.trim()

  return EMAIL_SIGNATURE_TEMPLATE
    .replace(/\{\{full_name\}\}/g, name)
    .replace(/\{\{job_title\}\}/g, title)
    .replace(/\{\{email\}\}/g, emailAddr)
}

function renderEmailSignatureText(params: {
  fullName?: string
  jobTitle?: string
  email: string
  from: string
}): string {
  const fallback = SENDER_METADATA[params.from] || {
    fullName: "BTM Security Operations",
    jobTitle: "AI-Powered Cyber Defense",
  }

  const name = params.fullName?.trim() || fallback.fullName
  const title = params.jobTitle?.trim() || fallback.jobTitle
  const emailAddr = params.email.trim()

  return `\n\n--\n${name}\n${title}\nBlue Team Module Security\nWEB: www.btmsec.com | EMAIL: ${emailAddr} | LOCATION: Global Operation\nCYBERSECURITY. INTELLIGENCE. RESILIENCE.\nAI-Powered Security Operations · Threat Intelligence · Vulnerability Assessment · Security Research\nGLOBAL REACH · AFRICAN PRIORITY\nBuilding a safer and more resilient digital world.\n© BTMSecurity | Blue Team Module Security`
}

// ---------------------------------------------------------------------------
// Explicit Sender Allowlist & Display Name Mapping
// ---------------------------------------------------------------------------
const FROM_MAP: Record<string, string> = {
  "security@research.btmsec.com":   "BTM Security <security@research.btmsec.com>",
  "disclosure@research.btmsec.com": "BTM Disclosure <disclosure@research.btmsec.com>",
  "advisory@research.btmsec.com":   "BTM Advisory <advisory@research.btmsec.com>",
}

// ---------------------------------------------------------------------------
// Explicit Reply-To Mapping
// ---------------------------------------------------------------------------
const SENDER_MAP: Record<string, string> = {
  "security@research.btmsec.com":   "security.research@btmsec.com",
  "disclosure@research.btmsec.com": "disclosure.research@btmsec.com",
  "advisory@research.btmsec.com":   "advisory@btmsec.com",
}

// ---------------------------------------------------------------------------
// In-Memory Rate Limiting: Max 10 sends per minute per IP
// ---------------------------------------------------------------------------
interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10

function isRateLimited(ip: string): boolean {
  const now = Date.now()

  // Evict stale entries if map grows large
  if (rateLimitStore.size > 1000) {
    rateLimitStore.forEach((entry, key) => {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key)
      }
    })
  }

  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }

  record.count += 1
  return false
}

// ---------------------------------------------------------------------------
// Helpers: Text / HTML Fallback Transformations
// ---------------------------------------------------------------------------

/**
 * Strips HTML tags, script/style blocks, and entities to create a clean plain-text fallback.
 */
function stripHtmlTags(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&bull;/gi, '•')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
}

/**
 * Escapes HTML characters in plain text input.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Wraps plain text in a minimal, safe <pre> HTML element to ensure both MIME parts exist.
 */
function textToHtmlFallback(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

  return `<pre style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; white-space: pre-wrap; word-break: break-word; color: #1e293b;">${escaped}</pre>`
}

// ---------------------------------------------------------------------------
// Zod Schema Validation
// ---------------------------------------------------------------------------

const emailArrayOrString = z
  .union([
    z.string().email('Invalid email address format'),
    z.array(z.string().email('Invalid email address in list'))
  ])
  .transform((val) => (Array.isArray(val) ? val : [val]))

const optionalEmailArrayOrString = z
  .union([
    z.string().email('Invalid email address format'),
    z.array(z.string().email('Invalid email address in list'))
  ])
  .optional()
  .transform((val) => {
    if (!val) return undefined
    return Array.isArray(val) ? val : [val]
  })

const sendEmailSchema = z
  .object({
    from: z.string().trim().min(1, 'From sender address is required'),
    to: emailArrayOrString.refine((arr) => arr.length > 0, {
      message: 'At least one recipient (to) is required'
    }),
    cc: optionalEmailArrayOrString,
    bcc: optionalEmailArrayOrString,
    subject: z.string().trim().min(1, 'Subject is required'),
    text: z.string().optional(),
    html: z.string().optional(),
    fullName: z.string().trim().optional(),
    jobTitle: z.string().trim().optional(),
  })
  .refine(
    (data) =>
      Boolean((data.text && data.text.trim().length > 0) || (data.html && data.html.trim().length > 0)),
    {
      message: 'At least one of text or html content is required',
      path: ['text']
    }
  )

// ---------------------------------------------------------------------------
// POST Handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    // 1. IP extraction & in-memory rate limiting check
    const forwardedFor = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp || '127.0.0.1'

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Maximum 10 emails per minute allowed per IP.'
        },
        { status: 429 }
      )
    }

    // 2. Parse request JSON body
    let rawBody: unknown
    try {
      rawBody = await request.json()
    } catch {
      return NextResponse.json(
        { success: false, error: 'Malformed JSON payload in request body' },
        { status: 400 }
      )
    }

    // 3. Validate with Zod
    const validationResult = sendEmailSchema.safeParse(rawBody)
    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues
        .map((issue) => issue.message)
        .join('; ')

      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 400 }
      )
    }

    const { from, to, cc, bcc, subject, text, html, fullName, jobTitle } = validationResult.data

    // 4. Validate sender against allowlist & derive display sender + Reply-To
    if (!Object.prototype.hasOwnProperty.call(FROM_MAP, from) || !FROM_MAP[from]) {
      return NextResponse.json(
        { success: false, error: 'Unsupported sender address' },
        { status: 400 }
      )
    }

    const formattedFrom = FROM_MAP[from]
    const replyTo = SENDER_MAP[from]

    // 5. Render custom branded signature & append to dual-part MIME payload
    const signatureHtml = renderEmailSignature({
      fullName,
      jobTitle,
      email: replyTo,
      from,
    })
    const signatureText = renderEmailSignatureText({
      fullName,
      jobTitle,
      email: replyTo,
      from,
    })

    const hasText = Boolean(text && text.trim().length > 0)
    const hasHtml = Boolean(html && html.trim().length > 0)

    let finalHtml = ''
    let finalText = ''

    if (hasHtml) {
      finalHtml = `${html}<br /><br />${signatureHtml}`
      finalText = hasText ? `${text}${signatureText}` : stripHtmlTags(finalHtml)
    } else if (hasText && text) {
      finalText = `${text}${signatureText}`
      finalHtml = `<div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${escapeHtml(text)}</div><br /><br />${signatureHtml}`
    }

    // 6. Dispatch via official Resend SDK
    const { data, error } = await resend.emails.send({
      from: formattedFrom,
      to,
      cc: cc && cc.length > 0 ? cc : undefined,
      bcc: bcc && bcc.length > 0 ? bcc : undefined,
      subject,
      text: finalText,
      html: finalHtml,
      replyTo
    })

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message || 'Resend API returned an error dispatching email'
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        id: data?.id
      },
      { status: 200 }
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
