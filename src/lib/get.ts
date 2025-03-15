export async function get_json(cookie: string, path: string, query: string) {
  const SERVER = "http://localhost:3000";
  const res = await fetch(`${SERVER}/api/get`, {
    method: "GET",
    headers: new Headers({
      Cookie: cookie,
      Path: path,
      Query: query,
    }),
  });
  // console.log(res);
  const data = await res.json();
  return data;
}
