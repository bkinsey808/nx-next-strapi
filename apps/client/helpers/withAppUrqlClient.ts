import { withUrqlClient } from 'next-urql';
import { getUrqlClientOptions } from './getUrqlClientOptions';

export const withAppUrqlClient = withUrqlClient(getUrqlClientOptions, {
  ssr: false,
});
