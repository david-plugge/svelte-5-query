import {
	notifyManager,
	type QueryClient,
	type QueryKey,
	type QueryObserver
} from '@tanstack/query-core';
import type { CreateBaseQueryOptions, CreateBaseQueryResult, GetterOrVal } from './types.js';
import { createSubscriber } from 'svelte/reactivity';
import { useIsRestoring, useQueryClient } from '@tanstack/svelte-query';

export function createBaseQuery<
	TQueryFnData,
	TError,
	TData,
	TQueryData,
	TQueryKey extends QueryKey
>(
	options: GetterOrVal<CreateBaseQueryOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>>,
	Observer: typeof QueryObserver,
	queryClient?: QueryClient
): CreateBaseQueryResult<TData, TError> {
	const client = useQueryClient(queryClient);
	const isRestoring = useIsRestoring();

	const queryOptions = $derived(typeof options === 'function' ? options() : options);
	const optionsWithDefaults = $derived.by(() => {
		const defaultedOptions = client.defaultQueryOptions(queryOptions);
		defaultedOptions._optimisticResults = isRestoring ? 'isRestoring' : 'optimistic';
		return defaultedOptions;
	});

	const observer = new Observer<TQueryFnData, TError, TData, TQueryData, TQueryKey>(
		client,
		optionsWithDefaults
	);

	$effect(() => {
		observer.setOptions(optionsWithDefaults, { listeners: false });
	});

	let currentResult = observer.getCurrentResult();

	const subscribe = createSubscriber((update) => {
		const unsubscribe = observer.subscribe(
			notifyManager.batchCalls((result) => {
				currentResult = result;
				update();
			})
		);
		observer.updateResult();
		return unsubscribe;
	});

	return new Proxy(currentResult, {
		get(_target, p, receiver) {
			subscribe();
			return Reflect.get(currentResult, p, receiver);
		}
	});
}
