import type {
	DefaultError,
	DefinedQueryObserverResult,
	InfiniteQueryObserverOptions,
	InfiniteQueryObserverResult,
	Mutation,
	MutationFilters,
	MutationObserverOptions,
	MutationObserverResult,
	MutationState,
	OmitKeyof,
	QueryKey,
	QueryObserverOptions,
	QueryObserverResult
} from '@tanstack/query-core';

export type GetterOrVal<T> = T | (() => T);

/** Options for createBaseQuery */
export type CreateBaseQueryOptions<
	TQueryFnData = unknown,
	TError = DefaultError,
	TData = TQueryFnData,
	TQueryData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey
> = QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>;

/** Result from createBaseQuery */
export type CreateBaseQueryResult<TData = unknown, TError = DefaultError> = QueryObserverResult<
	TData,
	TError
>;

/** Options for createQuery */
export type CreateQueryOptions<
	TQueryFnData = unknown,
	TError = DefaultError,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey
> = CreateBaseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>;

/** Result from createQuery */
export type CreateQueryResult<TData = unknown, TError = DefaultError> = CreateBaseQueryResult<
	TData,
	TError
>;

/** Options for createInfiniteQuery */
export type CreateInfiniteQueryOptions<
	TQueryFnData = unknown,
	TError = DefaultError,
	TData = TQueryFnData,
	TQueryData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown
> = InfiniteQueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey, TPageParam>;

/** Result from createInfiniteQuery */
export type CreateInfiniteQueryResult<
	TData = unknown,
	TError = DefaultError
> = InfiniteQueryObserverResult<TData, TError>;

/** Options for createBaseQuery with initialData */
export type DefinedCreateBaseQueryResult<
	TData = unknown,
	TError = DefaultError
> = DefinedQueryObserverResult<TData, TError>;

/** Options for createQuery with initialData */
export type DefinedCreateQueryResult<
	TData = unknown,
	TError = DefaultError
> = DefinedCreateBaseQueryResult<TData, TError>;

/** Options for createMutation */
export type CreateMutationOptions<
	TData = unknown,
	TError = DefaultError,
	TVariables = void,
	TContext = unknown
> = OmitKeyof<MutationObserverOptions<TData, TError, TVariables, TContext>, '_defaulted'>;

export type CreateBaseMutationResult<
	TData = unknown,
	TError = DefaultError,
	TVariables = unknown,
	TContext = unknown
> = MutationObserverResult<TData, TError, TVariables, TContext>;

/** Result from createMutation */
export type CreateMutationResult<
	TData = unknown,
	TError = DefaultError,
	TVariables = unknown,
	TContext = unknown
> = CreateBaseMutationResult<TData, TError, TVariables, TContext>;

/** Options for useMutationState */
export type MutationStateOptions<TResult = MutationState> = {
	filters?: MutationFilters;
	select?: (mutation: Mutation<unknown, DefaultError, unknown, unknown>) => TResult;
};
