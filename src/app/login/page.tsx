import 'bootstrap/dist/css/bootstrap.min.css'

export async function LoginReq(name: string, password: string) {
  // const SERVER = 'http://q-dev.trapti.tech';
  const SERVER = 'http://host.docker.internal:3000';
  const res = await fetch(`${SERVER}/api/v3/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      password: password
    }),
    credentials: "include", // 追加
  })
  return res.headers.getSetCookie().toString();
}

export default async function Login() {
  // const host = (await headers()).get("host");
  // const cookie = await LoginReq('traq','traq');
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="inputName1" className="form-label">User Name</label>
        <input type="name" className="form-control" id="inputName1"/>
      </div>
      <div className="mb-3">
        <label htmlFor="inputPass1" className="form-label">Password</label>
        <input type="password" className="form-control" id="inputPass1"/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>);
}
