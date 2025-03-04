import { InfiniteQueryObserver } from '@tanstack/query-core';
import type {
	DefaultError,
	InfiniteData,
	QueryClient,
	QueryKey,
	QueryObserver
} from '@tanstack/query-core';
import type {
	CreateInfiniteQueryOptions,
	CreateInfiniteQueryResult,
	GetterOrVal
} from './types.js';
import { createBaseQuery } from './createBaseQuery.svelte.js';

export function createInfiniteQuery<
	TQueryFnData,
	TError = DefaultError,
	TData = InfiniteData<TQueryFnData>,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown
>(
	options: GetterOrVal<
		CreateInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey, TPageParam>
	>,
	queryClient?: QueryClient
): CreateInfiniteQueryResult<TData, TError> {
	return createBaseQuery(
		options,
		InfiniteQueryObserver as typeof QueryObserver,
		queryClient
	) as CreateInfiniteQueryResult<TData, TError>;
}
