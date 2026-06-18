export type AdminResponse<T = never> =
  | { ok: true; item: T }
  | { ok: true; items: T[]; total: number; page: number; limit: number }
  | { ok: true }
  | {
      ok: false
      code:
        | 'UNAUTHORIZED'
        | 'SESSION_EXPIRED'
        | 'NOT_FOUND'
        | 'VALIDATION_ERROR'
        | 'INVALID_JSON'
        | 'CONFLICT'
        | 'SERVER_ERROR'
        | 'INVALID_PAYLOAD'
        | 'FORBIDDEN'
        | 'INVALID_CONTENT_TYPE'
        | 'INVALID_FORM'
        | 'NO_FILE'
        | 'INVALID_TYPE'
        | 'FILE_TOO_LARGE'
        | 'SMTP_NOT_CONFIGURED'
        | 'EMAIL_SEND_FAILED'
      message?: string
      fieldErrors?: Record<string, string>
    }
