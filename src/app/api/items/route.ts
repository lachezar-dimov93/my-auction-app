import { NextResponse } from "next/server";

const ITEMS_URL =
  "https://sttrafficplatformassets.blob.core.windows.net/traffic-assets/lots.json";

export async function GET() {
  const res = await fetch(ITEMS_URL);
  if (!res.ok) {
    return NextResponse.error();
  }
  const items = await res.json();
  return NextResponse.json(items);
}