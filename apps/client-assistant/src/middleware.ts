import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/chats/:path*",
    "/api/chat/:path*",
  ],
}; 