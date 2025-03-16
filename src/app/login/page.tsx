import { login } from "@/lib/get";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Login() {
  async function subscribe(formData: FormData) {
    "use server";
    console.log(formData);
    const cookieStore = await cookies();
    const cookie = await login(formData.get("name") as string, formData.get("password") as string);
    cookieStore.set("cookie", cookie);
    redirect("/home");
  }
  return (
    <form action={subscribe}>
      <div data-mdb-input-init className="form-outline mb-4">
        <label className="name" htmlFor="name">
          name
        </label>
        <input type="text" id="name" className="form-control" name="name" />
      </div>

      <div data-mdb-input-init className="form-outline mb-4">
        <label className="password" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          name="password"
        />
      </div>
      <button
        type="submit"
        data-mdb-button-init
        data-mdb-ripple-init
        className="btn btn-primary btn-block mb-4"
      >
        Sign in
      </button>
    </form>
  );
}
