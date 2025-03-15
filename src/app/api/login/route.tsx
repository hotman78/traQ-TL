export async function POST(req: Request) {
  // const SERVER = 'http://q-dev.trapti.tech';
  const SERVER = "http://host.docker.internal:3000";
  const name = req.headers.get("name");
  const password = req.headers.get("password");
  const res = await fetch(`${SERVER}/api/v3/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      password: password
    }),
    credentials: "include" // 追加
  });
  return res;
}
