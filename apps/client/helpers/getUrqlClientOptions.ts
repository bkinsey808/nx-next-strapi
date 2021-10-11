import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from 'urql';
import { SSRExchange } from 'next-urql';
import { authExchange } from '@urql/exchange-auth';
import { devtoolsExchange } from '@urql/devtools';
import { makeOperation } from 'urql';

const getAuth = async ({ authState }) => {
  if (typeof window === 'undefined') {
    return { authState };
  }
  console.log({ authState });
  if (!authState) {
    const token =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('token')
        : undefined;
    if (token) {
      console.log('got token', { token });
      return { token };
    }
    return null;
  }

  return null;
};

const addAuthToOperation = ({ authState, operation }) => {
  console.log({ authState });
  if (!authState || !authState.token) {
    return operation;
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  const needsAuthorization = !operation.query.definitions.some(({ name }) =>
    ['Login', 'Register'].includes(name.value)
  );

  console.log({ needsAuthorization });
  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        ...(needsAuthorization && {
          Authorization: `Bearer ${authState.token}`,
        }),
      },
    },
  });
};

const didAuthError = ({ error }) => {
  console.log({ error });
  return error.graphQLErrors.some((e) => e.extensions?.code === 'FORBIDDEN');
};

export const getUrqlClientOptions =
  (withAuth: boolean) =>
  (ssrCache: SSRExchange = ssrExchange({ isClient: true })) => ({
    url: process.env.NEXT_PUBLIC_CMS_GRAPHQL,
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange,
      // for some reason, authExchange cannot be used on any page that should be SSG'd
      ...(withAuth
        ? [authExchange({ getAuth, addAuthToOperation, didAuthError })]
        : []),
      ssrCache,
      fetchExchange,
    ],
  });
