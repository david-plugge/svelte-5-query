<script lang="ts">
	import type { DehydratedState, HydrateOptions, QueryClient } from '@tanstack/query-core';
	import { useHydrate } from '@tanstack/svelte-query';
	import type { Snippet } from 'svelte';

	interface Props {
		state: DehydratedState;
		options?: HydrateOptions;
		queryClient?: QueryClient;
		children?: Snippet;
	}
	let { state, options, queryClient, children }: Props = $props();

	useHydrate(state, options, queryClient);
</script>

{@render children?.()}
