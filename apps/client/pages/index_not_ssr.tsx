import { gql, useQuery } from 'urql';
import { withUrqlClient } from 'next-urql';

const POSTS_QUERY = gql`
  query {
    posts {
      id
      Title
      Content
    }
  }
`;

export function Index() {
  const [res] = useQuery({ query: POSTS_QUERY });
  if (res.fetching) {
    return <div>Loading...</div>;
  }
  if (res.error) {
    return <div>Error!</div>;
  }
  return (
    <div>
      <h1>Posts</h1>
      {res.data.posts.map((post) => (
        <div key={post.id}>
          <h2>{post.Title}</h2>
          <div>{post.Content}</div>
        </div>
      ))}
    </div>
  );
}

export default withUrqlClient((_ssrExchange, _ctx) => ({
  // ...add your Client options here
  url: 'http://localhost:1337/graphql',
}))(Index);
