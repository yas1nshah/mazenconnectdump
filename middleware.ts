
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from "next/headers";
import { lucia } from './lib/auth';
import { validateRequest } from './lib/validateSession';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const authCookie = request.cookies.get("auth_session");
    if (!authCookie) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    

    return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', "/campus/:path*"]
}