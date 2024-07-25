import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
export const middleware = async(req)=>{
const token = await getToken({req, secret: process.env.JWT_SECRET })
const {pathname} = req.nextUrl
if (!token || !token?.user || !token?.user?.isadmin) {
const signInUrl = new URL('/api/auth/signin',req.url);
signInUrl.searchParams.set('callbackUrl', pathname)   
return NextResponse.redirect(signInUrl)
}
return NextResponse.next()
}

export const config = {
   matcher: ['/dashboard/:path*']
}