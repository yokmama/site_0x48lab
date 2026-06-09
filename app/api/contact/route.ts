import {
  normalizeContactRequest,
  type ContactResponse,
  validateContactRequest,
} from '@/lib/contact'

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    const body: ContactResponse = {
      ok: false,
      code: 'INVALID_JSON',
      message: 'JSON payload is required.',
    }
    return Response.json(body, { status: 400 })
  }

  const contact = normalizeContactRequest(payload)
  if (!contact) {
    const body: ContactResponse = {
      ok: false,
      code: 'VALIDATION_ERROR',
      message: 'Invalid contact payload.',
    }
    return Response.json(body, { status: 400 })
  }

  const fieldErrors = validateContactRequest(contact)
  if (Object.keys(fieldErrors).length > 0) {
    const body: ContactResponse = {
      ok: false,
      code: 'VALIDATION_ERROR',
      message: 'Contact payload failed validation.',
      fieldErrors,
    }
    return Response.json(body, { status: 400 })
  }

  const body: ContactResponse = {
    ok: false,
    code: 'NOT_CONFIGURED',
    message: 'Contact delivery is not configured yet.',
  }

  return Response.json(body, { status: 501 })
}
