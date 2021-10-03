import {
  ssrExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from '@urql/core';
import { initUrqlClient } from 'next-urql';

export function getUrqlClient() {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: process.env.NEXT_PUBLIC_CMS_GRAPHQL,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false // canEnableSuspense
  );

  return { client, ssrCache };
}
