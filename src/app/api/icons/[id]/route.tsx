export const config = {
  runtime: "experimental-edge"
};

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // const SERVER = "https://q-dev.trapti.tech";
  const SERVER = process.env.SERVER_PATH || "https://q.trap.jp";;
  const res = await fetch(`${SERVER}/api/v3/public/icon/${id}`);
  return res;
}
