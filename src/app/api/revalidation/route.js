import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request) {
  const requestHeaders = new Headers(request.headers);
  const secret = requestHeaders.get("x-vercel-reval-key");

  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const payload = await request.json();
  const contentType = payload?.sys?.contentType?.sys?.id;
  const tagMap = {
    showcase: "showcase",
  };
  const tag = tagMap[contentType] || "default";

  revalidateTag(tag);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
