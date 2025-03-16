export async function POST(req: Request) {
  const SERVER = process.env.SERVER_PATH;
  const providerName = req.headers.get("providerName");
  const res = await fetch(`${SERVER}/api/v3/login?redirect=q.trap.jp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      providerName: providerName
    }),
    credentials: "include" // 追加
  });
  return res;
}
