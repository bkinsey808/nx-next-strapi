import Link from 'next/link';
import { gql } from 'urql';
import { usePostsQuery } from '../../graphql';
import { withAuthUrqlClient } from '../../helpers/withAppUrqlClient';
import { getSsrUrqlClient } from '../../helpers/getUrqlClient';

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
      <h1>SecretStuff</h1>
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
  const { client, ssrCache } = getSsrUrqlClient();

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

export default withAuthUrqlClient(Index);
