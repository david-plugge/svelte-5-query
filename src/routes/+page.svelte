<script lang="ts">
	import { createMutation } from '$lib/createMutation.svelte.js';
	import { createQuery } from '$lib/createQuery.js';

	let postId = $state(1);

	const postQuery = createQuery(() => ({
		queryKey: ['posts', postId],
		queryFn: async () => {
			const response = await fetch(`/api/posts/${postId}`);
			if (!response.ok) {
				throw new Error('something went wrong!');
			}
			const post: {
				title: string;
			} = await response.json();

			return post;
		}
	}));

	interface EchoData {
		message: string;
	}
	let message = $state('Test');
	const echoMutation = createMutation({
		mutationFn: async (input: EchoData) => {
			const response = await fetch('/api/echo', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(input)
			});

			const output: EchoData = await response.json();
			return output;
		}
	});
</script>

<div>
	<input type="number" bind:value={postId} />

	{#if postQuery.isLoading}
		<p>Loading post...</p>
	{:else if postQuery.isSuccess}
		<p>Post: {postQuery.data.title}</p>
	{:else if postQuery.error}
		<p>Something went wrong</p>
	{/if}
</div>

<div>
	<form
		onsubmit={(e) => {
			e.preventDefault();
			echoMutation.mutate({
				message: message
			});
		}}
	>
		<input bind:value={message} />
	</form>

	{#if echoMutation.isPending}
		<p>Mutating...</p>
	{:else if echoMutation.isSuccess}
		<p>Response: {echoMutation.data.message}</p>
	{:else if echoMutation.error}
		<p>Something went wrong</p>
	{/if}
</div>
