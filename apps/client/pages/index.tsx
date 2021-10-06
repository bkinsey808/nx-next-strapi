import Link from 'next/link';
import { gql } from 'urql';
import { usePostsQuery } from '../graphql';
import { withAppUrqlClient } from '../helpers/withAppUrqlClient';
import { getUrqlClient } from '../helpers/getUrqlClient';

const POSTS_QUERY = gql`
  query Posts {
    posts {
      id
      Title
      Content
      Slug
    }
  }
`;

export function Index() {
  const [{ data }] = usePostsQuery();

  return (
    <div>
      <h1>Posts</h1>
      {data?.posts?.map((post) => (
        <div key={post.id}>
          <Link href={`/post/${post.Slug}`}>
            <a>
              <h2>{post.Title}</h2>
            </a>
          </Link>
          <div>{post.Content}</div>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps(_ctx) {
  const { client, ssrCache } = getUrqlClient();

  // This query is used to populate the cache for the query
  // used on this page.
  const res = await client.query(POSTS_QUERY).toPromise();
  console.log(res);

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
    revalidate: 600,
  };
}

export default withAppUrqlClient(Index);
