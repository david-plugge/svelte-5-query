<script lang="ts">
	import QueryClientProvider from '$lib/QueryClientProvider.svelte';

	let { children, data } = $props();
</script>

<QueryClientProvider client={data.queryClient}>
	{@render children()}
</QueryClientProvider>
