import { NextResponse } from 'next/server'
import { getUser } from './lib/getUser';
// import type { NextRequest } from 'next/server'

const publicRoutes = ["/login", "/signup"];// donot include "/" rute here as it leads to error of application crash as "/" is included everywhere
const privateRoutes = ["/home", "/home/add-book"];

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
    // console.log("request : ", request.url);
     const { pathname } = req.nextUrl;
    const isPublic = publicRoutes.some((prefix)=>pathname.startsWith(prefix));
    const isPrivate = privateRoutes.some((prefix)=>pathname.startsWith(prefix));
    const user = await getUser();
    // console.log(isPublic);
    // console.log(user);
    
    if(!user && isPublic){
      // return NextResponse.redirect(new URL(req.url));
      return NextResponse.next();
    }if(!user && isPrivate){
      return NextResponse.redirect(new URL("/", req.url));
    }if(user && isPublic){
      return NextResponse.redirect(new URL("/home", req.url));
    }

    if(pathname==="/" && user){
      return NextResponse.redirect(new URL("/home", req.url));
    }

    
    return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/about/:path*', "/home", "/", "/signup", "/home/add-book", "/home/books/edit/:path"],
}