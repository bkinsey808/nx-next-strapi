import * as yup from 'yup';
import { AppFieldConfig } from '../appForm';
import { getCreateCommentOnValidSubmitHandler } from './helpers/getCreateCommentOnValidSubmitHandler';
import { gql } from 'urql';
import { useAppForm } from '../appForm/useAppForm';
import { useCreateCommentMutation } from '../../graphql';

gql`
  mutation CreateComment($comment: String!, $postId: ID!) {
    createComment(input: { data: { Comment: $comment, Post: $postId } }) {
      comment {
        Comment
      }
    }
  }
`;

export const createCommentFieldConfig: AppFieldConfig = {
  username: {
    label: 'Create Comment',
    required: true,
    type: 'text',
    yupValidation: yup.string(),
  },
};

/** abstract non-display logic for CreateCommentForm component */
export const useCreateCommentForm = () =>
  useAppForm({
    formId: 'createComment',
    useMutation: useCreateCommentMutation,
    fieldConfig: createCommentFieldConfig,
    getOnValidSubmitHandler: getCreateCommentOnValidSubmitHandler,
  });
