import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const data = await request.json();
	return json(data);
};
