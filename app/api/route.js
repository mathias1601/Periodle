export async function GET(request) {

	const { searchParams } = new URL(request.url);
	const name = searchParams.get('name');

	const res = await fetch(`https://api.apiverve.com/v1/periodictable?name=${name}`,
		{
			headers: {
				'x-api-key': process.env.PERIODIC_TABLE_API_KEY,
			},
		})
	const data = await res.json()

	return Response.json({ data })
}