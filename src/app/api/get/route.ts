export const config = {
  runtime: "experimental-edge"
};


export async function GET(req: Request) {
  // const SERVER = "http://q-dev.trapti.tech";
  const SERVER = "http://host.docker.internal:3000";
  const path = req.headers.get("Path");
  const query = req.headers.get("Query");
  const cookie = req.headers.get("Cookie");
  const res = await fetch(`${SERVER}/api/v3${path}?${query}`, {
    method: "GET",
    headers: new Headers({
      Cookie: cookie || ""
    })
  });
  console.log(res);
  return res;
}
