import { json } from '@sveltejs/kit';

export const GET = ({ params: { postId } }) => {
	return json({
		title: `This is post ${postId}!`
	});
};
