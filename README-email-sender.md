# Internal Email Sender (Resend API)

This feature provides an authenticated internal email dispatcher for BTM Security advisories, bulletins, and operations directly via the official [Resend](https://resend.com) API.

---

## 1. Prerequisites & Resend Setup

### A. Create Your Resend API Key
1. Sign in to your [Resend Dashboard](https://resend.com).
2. Navigate to **API Keys** and click **Create API Key**.
3. Grant **Sending access** (either "Full Access" or restricted to your sending domain).
4. Copy the generated key (`re_...`) and paste it into `.env.local` as `RESEND_API_KEY`.

### B. Verify the Sending Domain (`research.btmsec.com`)
1. Go to **Domains** in the Resend Dashboard and add:
   ```text
   research.btmsec.com
   ```
2. Resend will provide DNS records:
   - **DKIM** (TXT / CNAME)
   - **SPF** (TXT)
   - **DMARC** (TXT)
3. Add these records in your DNS provider for the `research.btmsec.com` subdomain and wait for status to show **Verified**.

---

## 2. Architecture & Sender Routing Note

> **CRITICAL DOMAIN ROUTING RULE:**
>
> * **`from` address:** Must use the verified subdomain:  
>   `security@research.btmsec.com` (configured in `RESEND_FROM_EMAIL`).  
>   *Reason:* Resend enforces cryptographically signed SPF/DKIM verification for outbound delivery.
>
> * **`replyTo` address:** Points to your primary incoming Zoho mailbox:  
>   `security@btmsec.com` (configured in `RESEND_REPLY_TO` and pre-filled in the UI).  
>   *Reason:* When recipients reply to advisories or notices, their messages are routed straight into your central Zoho Mail security inbox without interfering with DNS SPF/DKIM records.

---

## 3. Installation & Local Development

Install the newly added dependencies (`resend` and `zod`) and run the development server:

```bash
npm install
npm run dev
```

Navigate to:
```
http://localhost:3000/email-sender
```

---

## 4. API Endpoint Reference

* **Route:** `POST /api/email/send`
* **Rate Limit:** 10 requests / minute per IP (in-memory)
* **Payload Structure:**
  ```json
  {
    "to": ["recipient1@example.com", "recipient2@example.com"],
    "cc": ["lead@btmsec.com"],
    "bcc": ["audit@btmsec.com"],
    "subject": "[SEC-ADVISORY] BTM Security Alert",
    "text": "Plain text fallback or primary content",
    "html": "<p>HTML formatted body</p>",
    "replyTo": "security@btmsec.com"
  }
  ```
* **MIME Fallback:** Providing only HTML generates a tag-stripped plain-text counterpart; providing only plain text auto-wraps it in semantic `<pre>` HTML. Both MIME parts are always delivered.

