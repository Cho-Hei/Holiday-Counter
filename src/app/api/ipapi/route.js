// Find client country by ip address

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const runtime = "edge";

export async function GET(request) {
    revalidatePath(request.url);

    // Country Fetching (only for Vercel)
    const clientcountry = request.headers.get("x-vercel-ip-country");
    const timezone = request.headers.get("x-vercel-ip-timezone");

    console.log("country", clientcountry)
    console.log("timezone", timezone)

    if (clientcountry) {
        return NextResponse.json(
            { countryCode: clientcountry, timezone: timezone },
            { status: 200 }
        );
    }

    // Country Fetching
    const data = await fetch(`https://ipapi.co/json/`).then((res) => res.json(), {
        cache: "no-store",
    });

    return NextResponse.json(data, {
        status: 200,
    });
}
