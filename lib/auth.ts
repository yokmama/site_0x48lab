import { cookies } from 'next/headers'
import crypto from 'node:crypto'
import { prisma } from './db'

export const SESSION_COOKIE = 'admin_session'
export const SESSION_DURATION_MS = 8 * 60 * 60 * 1000 // 8 hours

export async function createSession(userId: number): Promise<string> {
  const id = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS)
  await prisma.adminSession.create({ data: { id, userId, expiresAt } })
  return id
}

export async function validateSession(
  id: string,
): Promise<{ userId: number; email: string; name: string } | null> {
  const session = await prisma.adminSession.findFirst({
    where: { id, expiresAt: { gt: new Date() } },
    include: { user: { select: { id: true, email: true, name: true } } },
  })
  if (!session) return null

  await prisma.adminSession.update({
    where: { id },
    data: { expiresAt: new Date(Date.now() + SESSION_DURATION_MS) },
  })
  return { userId: session.user.id, email: session.user.email, name: session.user.name }
}

export async function deleteSession(id: string): Promise<void> {
  await prisma.adminSession.deleteMany({ where: { id } })
}

export async function getSessionId(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE)?.value
}

export async function requireAdminPage(): Promise<{ userId: number; email: string; name: string }> {
  const { redirect } = await import('next/navigation')
  const id = await getSessionId()
  if (!id) redirect('/admin/login')
  const user = await validateSession(id)
  if (!user) redirect('/admin/login')
  return user
}

export function sessionCookieHeader(id: string): string {
  return `${SESSION_COOKIE}=${id}; HttpOnly; SameSite=Lax; Path=/admin; Max-Age=${SESSION_DURATION_MS / 1000}`
}

export function clearSessionCookieHeader(): string {
  return `${SESSION_COOKIE}=; HttpOnly; SameSite=Lax; Path=/admin; Max-Age=0`
}
