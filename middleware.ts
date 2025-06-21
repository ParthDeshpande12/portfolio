import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // If the pathname is not '/', redirect to home
  if (request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}

// Exclude Next.js internals and API routes from middleware
export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
} 