import { gql } from 'urql';
import { Exact, useLoginMutation } from '../graphql';
import { withAppUrqlClient } from '../helpers/withAppUrqlClient';

const LOGIN_GQL = gql`
  mutation Login($username: String!, $password: String!) {
    login(input: { identifier: $username, password: $password }) {
      jwt
      user {
        role {
          name
          description
          type
        }
      }
    }
  }
`;

export function Login() {
  const [state, executeMutation] = useLoginMutation();
  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = Array.from(e.currentTarget.elements)
            .filter((e) => e.tagName === 'INPUT')
            .reduce((acc, element: HTMLInputElement) => {
              acc[element.name] = element.value;
              return acc;
            }, {} as Exact<{ username: string; password: string }>);
          const { data, error } = await executeMutation(formData);
          console.log({ data, error });
          console.log(
            (error?.graphQLErrors?.[0]?.originalError as any)?.extensions
              ?.exception?.data?.message?.[0]?.messages?.[0]?.message
          );
        }}
      >
        <input name="username" />
        <input name="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default withAppUrqlClient(Login);
