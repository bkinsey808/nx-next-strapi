import { getUrqlClientOptions } from './getUrqlClientOptions';
import { initUrqlClient } from 'next-urql';
import { ssrExchange } from '@urql/core';

export function getSsrUrqlClient() {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    getUrqlClientOptions(false)(ssrCache),
    false // canEnableSuspense
  );

  return { client, ssrCache };
}

export function getBrowserUrqlClient() {
  const ssrCache = ssrExchange({ isClient: true });
  const client = initUrqlClient(
    getUrqlClientOptions(true)(ssrCache),
    false // canEnableSuspense
  );

  return { client, ssrCache };
}
