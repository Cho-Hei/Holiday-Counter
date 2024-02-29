import { NextResponse } from "next/server";

export async function GET(req, res) {
  let H_YEAR = req.nextUrl.searchParams.get("YEAR");
  let H_COUNTRY = req.nextUrl.searchParams.get("COUNTRY");

  const data = await fetch(
    `https://calendarific.com/api/v2/holidays?&api_key=${process.env.HOLIDAY_KEY}&country=${H_COUNTRY}&year=${H_YEAR}`
  ).then((response) => response.json());

  return NextResponse.json(data.response.holidays, {
    status: 200,
  });
}
