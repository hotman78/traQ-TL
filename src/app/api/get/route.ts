export const config = {
  runtime: "experimental-edge"
};

export async function GET(req: Request) {
  // const SERVER = "http://q-dev.trapti.tech";
  const SERVER = process.env.SERVER_PATH;
  const path = req.headers.get("Path");
  const query = req.headers.get("Query");
  const cookie = req.headers.get("Cookie");
  const res = await fetch(`${SERVER}/api/v3${path}?${query}`, {
    method: "GET",
    headers: new Headers({
      Cookie: cookie || ""
    })
  });
  // res.headers.set("Content-Encoding", "gzip");
  return new Response(res.body);
}
