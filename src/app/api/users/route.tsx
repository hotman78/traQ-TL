export async function GET(_: Request) {
    // const { searchParams } = new URL(req.url);
    const url ='http://host.docker.internal:3000/api/v3/users?include-suspended=false'
    const res = await fetch(url);
    console.log(res);
    // return res;
    // const data = await res.json();
    return Response.json({});
}