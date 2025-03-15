export const config = {
  runtime: "experimental-edge"
};

type IdType = {
  params: {
    id: string;
  };
};

export async function GET(req: Request, { params }: IdType) {
  const { id } = await params;
  // const SERVER = "https://q-dev.trapti.tech";
  const SERVER = "http://host.docker.internal:3000";
  const res = await fetch(`${SERVER}/api/v3/public/icon/${id}`);
  return res;
}
