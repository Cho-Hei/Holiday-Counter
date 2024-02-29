// Find client country by ip address

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  revalidatePath(request.url);
  const data = await fetch(`http://ip-api.com/json/`).then(
    (res) => res.json(),
    {
      cache: "no-store",
    }
  );

  return NextResponse.json(data, {
    status: 200,
  });
}
