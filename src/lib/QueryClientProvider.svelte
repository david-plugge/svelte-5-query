<script lang="ts">
	import { onDestroy, onMount, type Snippet } from 'svelte';
	import { QueryClient } from '@tanstack/query-core';
	import { setQueryClientContext } from '@tanstack/svelte-query';

	interface Props {
		client: QueryClient;
		children?: Snippet;
	}
	let { client, children }: Props = $props();

	onMount(() => {
		client.mount();
	});

	setQueryClientContext(client);

	onDestroy(() => {
		client.unmount();
	});
</script>

{@render children?.()}
