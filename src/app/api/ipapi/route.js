// Find client country by ip address

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const runtime = "edge";

export async function GET(request) {
  revalidatePath(request.url);

  const clientcountry = request.headers.get("X-Vercel-IP-Country");

  if (clientcountry) {
    return NextResponse.json({ countryCode: clientcountry }, { status: 200 });
  }

  const data = await fetch(`https://ipapi.co/json/`).then((res) => res.json(), {
    cache: "no-store",
  });

  return NextResponse.json(data, {
    status: 200,
  });
}
