import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/admin/:path*'],
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next()
  }

  const sessionId = request.cookies.get('admin_session')?.value
  if (!sessionId) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}
