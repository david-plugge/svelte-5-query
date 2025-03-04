import { browser } from '$app/environment';
import { QueryClient } from '$lib/index.js';

export const load = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	return {
		queryClient
	};
};
