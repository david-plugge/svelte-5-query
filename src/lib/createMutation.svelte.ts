import { MutationObserver, notifyManager } from '@tanstack/query-core';
import type { CreateMutationOptions, CreateMutationResult, GetterOrVal } from './types.js';
import type { DefaultError, QueryClient } from '@tanstack/query-core';
import { createSubscriber } from 'svelte/reactivity';
import { useQueryClient } from '@tanstack/svelte-query';

export function createMutation<
	TData = unknown,
	TError = DefaultError,
	TVariables = void,
	TContext = unknown
>(
	options: GetterOrVal<CreateMutationOptions<TData, TError, TVariables, TContext>>,
	queryClient?: QueryClient
): CreateMutationResult<TData, TError, TVariables, TContext> {
	const client = useQueryClient(queryClient);

	const mutationOptions = $derived(typeof options === 'function' ? options() : options);

	const observer = new MutationObserver<TData, TError, TVariables, TContext>(
		client,
		mutationOptions
	);

	$effect(() => {
		observer.setOptions(mutationOptions);
	});

	let currentResult = observer.getCurrentResult();

	const subscribe = createSubscriber((update) => {
		const unsubscribe = observer.subscribe(
			notifyManager.batchCalls((result) => {
				currentResult = result;
				update();
			})
		);
		return unsubscribe;
	});

	return new Proxy(currentResult, {
		get(_target, p, receiver) {
			subscribe();
			return Reflect.get(currentResult, p, receiver);
		}
	});
}
