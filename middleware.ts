import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // List of allowed paths
  const allowedPaths = [
    '/', 
    '/actress-bio', 
    '/films', 
    '/tv', 
    '/ads', 
    '/extras'
  ];
  
  // If the current path is allowed, let it through
  if (allowedPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  
  // Everything else gets redirected to home
  return NextResponse.redirect(new URL('/', request.url));
}

// Exclude Next.js internals and API routes from middleware
export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
}