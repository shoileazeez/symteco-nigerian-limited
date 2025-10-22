import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  
  // Handle admin subdomain
  if (hostname.startsWith('admin.')) {
    // Check if it's already an admin route
    if (!request.nextUrl.pathname.startsWith('/admin')) {
      // Rewrite to admin routes
      return NextResponse.rewrite(new URL(`/admin${request.nextUrl.pathname}`, request.url))
    }
  }
  
  // Handle main domain - prevent access to admin routes
  if (!hostname.startsWith('admin.') && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}