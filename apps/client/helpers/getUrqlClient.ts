import { ssrExchange } from '@urql/core';
import { initUrqlClient } from 'next-urql';
import { getUrqlClientOptions } from './getUrqlClientOptions';

export function getUrqlClient() {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    getUrqlClientOptions(ssrCache),
    false // canEnableSuspense
  );

  return { client, ssrCache };
}
