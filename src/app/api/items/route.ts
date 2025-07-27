import { ITEMS_URL } from "@/constants/urls";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(ITEMS_URL);
  if (!res.ok) {
    return NextResponse.error();
  }
  const items = await res.json();
  return NextResponse.json(items);
}
