import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge"
};

export default async function handler(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    // const hasId = searchParams.has("id");
    const id = searchParams.get("id");
    const cookie = searchParams.get("cookie")!;

    const res = await fetch(`http://host.docker.internal:3000/api/v3/users/${id}/icon`,{
      method: "GET",
      headers: new Headers({
        "Cookie": cookie,
      })
    })
    return res;
}