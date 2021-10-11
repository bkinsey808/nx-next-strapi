export const fetchGraphql = async (
  query: string,
  variables: Record<string, unknown>
) => {
  const rawResult = await fetch(process.env.NEXT_PUBLIC_CMS_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  return await rawResult.json();
};
