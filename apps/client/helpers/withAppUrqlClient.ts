import { withUrqlClient } from 'next-urql';
import { getUrqlClientOptions } from './getUrqlClientOptions';

export const withAuthUrqlClient = withUrqlClient(getUrqlClientOptions(true), {
  ssr: false,
});

export const withNoAuthUrqlClient = withUrqlClient(
  getUrqlClientOptions(false),
  {
    ssr: false,
  }
);
