export async function get(cookie: string, path: string, query: string) {
  const SERVER = "http://localhost:3000";
  const res = await fetch(`${SERVER}/api/get`, {
    method: "GET",
    headers: new Headers({
      Cookie: cookie,
      Path: path,
      Query: query
    }),
    cache: "no-store"
  });
  return res;
}

export async function get_json(cookie: string, path: string, query: string) {
  const res = await get(cookie, path, query);
  return res.json();
}

export async function login(name: string, password: string) {
  const SERVER = "http://localhost:3000";
  const res = await fetch(`${SERVER}/api/login`, {
    method: "POST",
    headers: new Headers({
      name: name,
      password: password
    })
  });
  return res.headers.getSetCookie().toString();
}

export async function login_by_ex_accounts() {
  const SERVER = "http://localhost:3000";
  const res = await fetch(`${SERVER}/api/ex-accounts`, {
    method: "POST",
    headers: new Headers({
      providerName: "q.trap.jp"
    })
  });
  return res.headers.getSetCookie().toString();
}
