import {
  AppFormHandleError,
  GetOnValidMutationSubmitHandler,
} from '../../appForm';
import {
  CreateCommentExtraVariables,
  CreateCommentFieldValues,
  CreateCommentVariables,
} from './createCommentTypes';
import { CreateCommentMutation } from '../../../graphql';
import { getBrowserUrqlClient } from '../../../helpers/getUrqlClient';
import { gql } from 'urql';

// filed an issue why ID unknown. see https://github.com/graphql/vscode-graphql/issues/331
// an alternative to graphql.vscode-graphql is kumar-harsh.graphql-for-vscode but I'd rather not use it as it hasn't been updated in 2yrs
gql`
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
  CreateCommentMutation,
  CreateCommentExtraVariables
> =
  ({ executeMutation, setFormError, setFieldError, formRef, extraVariables }) =>
  async (formFieldValues) => {
    try {
      const { data, error } = await executeMutation({
        ...formFieldValues,
        ...extraVariables,
      });

      console.log({ data, error });
    } catch (err) {
      console.log({ err });
      createCommentHandleError(err, setFormError);
    }
  };
