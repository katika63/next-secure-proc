import { Resend } from 'resend'

// Global augmentation for Resend singleton across HMR in development
const globalForResend = globalThis as unknown as {
  resendClient: Resend | undefined
}

export const resend =
  globalForResend.resendClient ?? new Resend(process.env.RESEND_API_KEY)

if (process.env.NODE_ENV !== 'production') {
  globalForResend.resendClient = resend
}

