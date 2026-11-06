import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { resend } from '@/lib/resend'

// ---------------------------------------------------------------------------
// Email Signatures (HTML & Plain Text)
// ---------------------------------------------------------------------------
const EMAIL_SIGNATURE = `
  <br />
  <br />
  <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 13px; color: #333333; line-height: 1.5; border-top: 2px solid #0b1220; padding-top: 10px; max-width: 500px;">
    <tr>
      <td>
        <strong style="font-size: 16px; color: #0b1220;">BTM Security</strong><br />
        <span style="color: #666666;">AI-Powered Cyber Defense for Modern Enterprises</span><br /><br />
        
        <a href="https://www.btmsec.com" style="color: #0056b3; text-decoration: none;">www.btmsec.com</a><br />
        <span style="color: #666666;">Global Reach &bull; African Priority</span><br /><br />
        
        <span style="font-size: 11px; color: #999999;">
          Confidentiality Notice: This email and any attachments are confidential and intended solely for the use of the individual or entity to whom they are addressed.
        </span>
      </td>
    </tr>
  </table>
`;

const EMAIL_SIGNATURE_TEXT = `\n\n--\nBTM Security | AI-Powered Cyber Defense for Modern Enterprises\nwww.btmsec.com | Global Reach • African Priority`;

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
    html: z.string().optional()
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

    const { from, to, cc, bcc, subject, text, html } = validationResult.data

    // 4. Validate sender against allowlist & derive display sender + Reply-To
    if (!Object.prototype.hasOwnProperty.call(FROM_MAP, from) || !FROM_MAP[from]) {
      return NextResponse.json(
        { success: false, error: 'Unsupported sender address' },
        { status: 400 }
      )
    }

    const formattedFrom = FROM_MAP[from]
    const replyTo = SENDER_MAP[from]

    // 5. Append signatures and generate dual-part MIME fallback
    const hasText = Boolean(text && text.trim().length > 0)
    const hasHtml = Boolean(html && html.trim().length > 0)

    let finalHtml = ''
    let finalText = ''

    if (hasHtml) {
      finalHtml = `${html}${EMAIL_SIGNATURE}`
      finalText = hasText ? `${text}${EMAIL_SIGNATURE_TEXT}` : stripHtmlTags(finalHtml)
    } else if (hasText) {
      finalText = `${text}${EMAIL_SIGNATURE_TEXT}`
      finalHtml = textToHtmlFallback(finalText)
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
