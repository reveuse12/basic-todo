import { NextRequest, NextResponse } from "next/server";
// import { verifyJwt } from "./lib/helpers/auth";
// import { verifyJwt } from "./lib/jwt"; // Adjust the path as needed

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for certain paths
  const skipPaths = [
    "/signin",
    "/signup",
    "/api/auth/signin",
    "/api/auth/signup",
    "/",
  ];
  if (skipPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Get the token from the cookie or Authorization header
  const token =
    request.cookies.get("auth") || request.headers.get("Authorization");

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("middleware:+++++++++++", pathname);
  try {
    // const decoded = verifyJwt(token.value.toString());

    // console.log("middleware:+++++++++++decoded----", decoded);

    // if (!decoded) {
    //   return NextResponse.redirect(new URL("/", request.url));
    // }

    // If verification succeeds, continue to the next middleware or route handler
    return NextResponse.next();
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
