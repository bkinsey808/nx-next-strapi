import { withUrqlClient } from 'next-urql';

export const withAppUrqlClient = withUrqlClient(
  (_ssr) => ({
    url: process.env.NEXT_PUBLIC_CMS_GRAPHQL,
  }),
  { ssr: false } // Important so we don't wrap our component in getInitialProps
);
