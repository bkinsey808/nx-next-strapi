import * as yup from 'yup';
import { AppFieldConfig } from '../appForm';
import { getLoginOnValidSubmitHandler } from './helpers/getLoginOnValidSubmitHandler';
import { gql } from 'urql';
import { useAppForm } from '../appForm/useAppForm';
import { useLoginMutation } from '../../graphql';

const CREATE_COMMENT_GQL = gql`
  mutation CreateComment($comment: String!, $postId: ID!) {
    createComment(input: { data: { Comment: $comment, Post: $postId } }) {
      comment {
        Comment
      }
    }
  }
`;

gql`
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

export const loginFieldConfig: AppFieldConfig = {
  username: {
    label: 'Username',
    required: true,
    type: 'text',
    yupValidation: yup.string().min(3),
  },
  password: {
    label: 'Password',
    required: true,
    type: 'password',
    yupValidation: yup.string(),
  },
};

/** abstract non-display logic for Login component */
export const useLoginForm = () =>
  useAppForm({
    formId: 'login',
    useMutation: useLoginMutation,
    fieldConfig: loginFieldConfig,
    getOnValidSubmitHandler: getLoginOnValidSubmitHandler,
  });
