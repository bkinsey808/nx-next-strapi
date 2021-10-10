import { PostSlugsQuery, usePostQuery } from '../../graphql';
import Link from 'next/link';
import { getSsrUrqlClient } from '../../helpers/getUrqlClient';
import { gql } from 'urql';
import { withNoAuthUrqlClient } from '../../helpers/withAppUrqlClient';

const POST_QUERY = gql`
  query Post($slug: String!) {
    posts(where: { Slug: $slug }) {
      id
      Title
      Content
      Slug
    }
  }
`;

const POST_SLUGS_QUERY = gql`
  query PostSlugs {
    posts {
      Slug
    }
  }
`;

function Post({ slug }) {
  const [{ data }] = usePostQuery({ variables: { slug } });
  const post = data?.posts[0];

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <Link href="/">
        <a>Go Home</a>
      </Link>
      <div>
        <h1>{post.Title}</h1>
        <p>{post.Content}</p>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const { client } = getSsrUrqlClient();
  const { data } = await client
    // we pass PostSlugsQuery as a generic type parameter so data gets typed
    .query<PostSlugsQuery>(POST_SLUGS_QUERY)
    .toPromise();

  const paths = (data?.posts ?? [])?.map(({ Slug }) => ({
    params: { slug: Slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const { client, ssrCache } = getSsrUrqlClient();

  // This query is used to populate the cache for the query
  // used on this page.
  await client.query(POST_QUERY, { slug }).toPromise();

  return {
    props: {
      slug,
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
    revalidate: 600,
  };
}

export default withNoAuthUrqlClient(Post);
