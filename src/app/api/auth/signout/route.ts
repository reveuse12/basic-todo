import { NextResponse } from "next/server";
// sign Out API
export async function GET() {
  try {
    // Clear the cookie
    const response = NextResponse.json({ message: "Signout Successful" });
    response.headers.set(
      "Set-Cookie",
      `auth=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
    );
    return response;
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
