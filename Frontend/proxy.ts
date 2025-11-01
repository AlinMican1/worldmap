import { NextResponse, NextRequest } from "next/server";

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  let cookie = req.cookies.get("access_token");
  if (cookie) {
    console.log(cookie);
  }
  // GET /_next/data/build-id/hello.json

  console.log(pathname);
  // with the flag this now /_next/data/build-id/hello.json
  // without the flag this would be normalized to /hello
}
// export const config = {
//   matcher: ["/", "/schedule"],
// };
