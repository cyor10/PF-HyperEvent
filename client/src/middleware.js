import { NextResponse } from 'next/server';
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // Assume a "Cookie:token=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  let cookie = request.cookies.get('tokens');
  console.log(cookie); // => { name: 'token', value: 'fast', Path: '/' }
  if (cookie) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/login', request.url));
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/payment/:path*', '/form/:path*'],
};
