import { CreateCommentForm } from '../../components/createCommentForm/createCommentForm';
import Link from 'next/link';
import { getSsrUrqlClient } from '../../helpers/getUrqlClient';
import { gql } from 'urql';
import { usePostQuery } from '../../graphql';
import { withNoAuthUrqlClient } from '../../helpers/withAppUrqlClient';

const POST_QUERY = gql`
  query Post($slug: String!) {
    posts(where: { Slug: $slug }) {
      id
      Title
      Content
      Slug
      comments {
        id
        Comment
        Author {
          id
          username
        }
      }
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
        {post.comments.length > 0 &&
          post.comments.map((comment) => (
            <div key={comment.id}>{comment.Comment}</div>
          ))}
      </div>
      <CreateCommentForm postId={post.id} />
    </>
  );
}

// SSR is necessary instead of SSG because we need to be able to show new comments
export async function getServerSideProps({ params }) {
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
  };
}

export default withNoAuthUrqlClient(Post);
