import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge"
};

export async function GET(req: Request, {params}) {
  const { id } = await params
  // const { searchParams } = new URL(req.url);
  // const cookie = searchParams.get("cookie")!;

  const res = await fetch(`http://host.docker.internal:3000/api/v3/public/icon/${slug}`)
  return res;
}