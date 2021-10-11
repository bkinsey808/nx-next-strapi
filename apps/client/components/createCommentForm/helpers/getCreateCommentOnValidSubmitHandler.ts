import {
  AppFormHandleError,
  GetOnValidMutationSubmitHandler,
} from '../../appForm';
import {
  CreateCommentExtraVariables,
  CreateCommentFieldValues,
  CreateCommentVariables,
} from './createCommentTypes';
import { OperationContext } from 'urql';
import { fetchGraphql } from '../../../helpers/fetchGraphql';
import { NextRouter } from 'next/router';

// filed an issue why ID unknown. see https://github.com/graphql/vscode-graphql/issues/331
// an alternative to graphql.vscode-graphql is kumar-harsh.graphql-for-vscode but I'd rather not use it as it hasn't been updated in 2yrs
const CREATE_COMMENT_GQL = `
  mutation CreateComment($comment: String!, $postId: ID!) {
    createComment(input: { data: { Comment: $comment, Post: $postId } }) {
      comment {
        Comment
      }
    }
  }
`;

const createCommentHandleError: AppFormHandleError = (err, setFormError) => {
  if ('errorSummary' in err) {
    setFormError(err.errorSummary);
  } else {
    setFormError(JSON.stringify(err));
  }
};

export const getCreateCommentOnValidSubmitHandler: GetOnValidMutationSubmitHandler<
  CreateCommentFieldValues,
  CreateCommentVariables,
  never,
  CreateCommentExtraVariables
> =
  ({ setFormError, setFieldError, formRef, extraVariables, extraOptions }) =>
  async (formFieldValues) => {
    try {
      const variables = {
        ...formFieldValues,
        ...extraVariables,
      };
      // this is necessary because SSR pages cannot have Urql authorization for some bizarre reason
      // see https://github.com/FormidableLabs/urql/discussions/2021
      const result = await fetchGraphql(CREATE_COMMENT_GQL, variables);
      console.log({ result, extraOptions });
      const res2 = await (
        extraOptions as {
          router: NextRouter;
        }
      ).router.reload();
      console.log({ res2 });
    } catch (err) {
      console.log({ err });
      createCommentHandleError(err, setFormError);
    }
  };
