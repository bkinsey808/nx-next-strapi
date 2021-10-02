import {
  cacheExchange,
  dedupExchange,
  fetchExchange,
  gql,
  ssrExchange,
} from 'urql';
import { initUrqlClient, withUrqlClient } from 'next-urql';
import { usePostsQuery } from '../graphql';

const POSTS_QUERY = gql`
  query Posts {
    posts {
      id
      Title
      Content
    }
  }
`;

export function Index() {
  const [{ data }] = usePostsQuery();
  return (
    <div>
      <h1>Posts</h1>
      {data.posts.map((post) => (
        <div key={post.id}>
          <h2>{post.Title}</h2>
          <div>{post.Content}</div>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps(_ctx) {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: process.env.NEXT_PUBLIC_CMS_GRAPHQL,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false // canEnableSuspense
  );

  // This query is used to populate the cache for the query
  // used on this page.
  await client.query(POSTS_QUERY).toPromise();

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
    revalidate: 600,
  };
}

export default withUrqlClient(
  (_ssr) => ({
    url: process.env.NEXT_PUBLIC_CMS_GRAPHQL,
  }),
  { ssr: false } // Important so we don't wrap our component in getInitialProps
)(Index);
