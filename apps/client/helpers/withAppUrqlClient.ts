import { getUrqlClientOptions } from './getUrqlClientOptions';
import { withUrqlClient } from 'next-urql';

export const withAuthUrqlClient = withUrqlClient(getUrqlClientOptions(true), {
  ssr: false,
});

export const withNoAuthUrqlClient = withUrqlClient(
  getUrqlClientOptions(false),
  {
    ssr: false,
  }
);
