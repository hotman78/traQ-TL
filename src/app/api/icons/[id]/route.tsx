export const config = {
  runtime: "experimental-edge"
};

export async function GET(req: Request, { params }: any) {
  console.log(params);
  const { id } = await params;
  // const SERVER = "https://q-dev.trapti.tech";
  const SERVER = "http://host.docker.internal:3000";
  const res = await fetch(`${SERVER}/api/v3/public/icon/${id}`);
  return res;
}
