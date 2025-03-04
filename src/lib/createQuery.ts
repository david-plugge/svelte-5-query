import { QueryObserver } from '@tanstack/query-core';
import { createBaseQuery } from './createBaseQuery.svelte';
import type { DefaultError, QueryClient, QueryKey } from '@tanstack/query-core';
import type {
	CreateQueryOptions,
	CreateQueryResult,
	DefinedCreateQueryResult,
	GetterOrVal
} from './types.js';
import type {
	DefinedInitialDataOptions,
	UndefinedInitialDataOptions
} from '@tanstack/svelte-query';

export function createQuery<
	TQueryFnData = unknown,
	TError = DefaultError,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey
>(
	options: GetterOrVal<DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>>,
	queryClient?: QueryClient
): DefinedCreateQueryResult<TData, TError>;

export function createQuery<
	TQueryFnData = unknown,
	TError = DefaultError,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey
>(
	options: GetterOrVal<UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>>,
	queryClient?: QueryClient
): CreateQueryResult<TData, TError>;

export function createQuery<
	TQueryFnData = unknown,
	TError = DefaultError,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey
>(
	options: GetterOrVal<CreateQueryOptions<TQueryFnData, TError, TData, TQueryKey>>,
	queryClient?: QueryClient
): CreateQueryResult<TData, TError>;

export function createQuery(options: GetterOrVal<CreateQueryOptions>, queryClient?: QueryClient) {
	return createBaseQuery(options, QueryObserver, queryClient);
}
