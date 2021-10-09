import { withUrqlClient } from 'next-urql';
import { getUrqlClientOptions } from './getUrqlClientOptions';

export const withAppUrqlClient = withUrqlClient(
  (_ssr) => getUrqlClientOptions(),
  { ssr: false } // Important so we don't wrap our component in getInitialProps
);
