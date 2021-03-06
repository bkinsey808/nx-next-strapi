import * as yup from 'yup';
import { AppFieldConfig } from '../appForm';
import { getLoginOnValidSubmitHandler } from './helpers/getLoginOnValidSubmitHandler';
import { gql } from 'urql';
import { useAppForm } from '../appForm/useAppForm';
import { useLoginMutation } from '../../graphql';

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

/** abstracted non-display logic for LoginForm component */
export const useLoginForm = () => {
  const [_state, executeMutation] = useLoginMutation();

  return useAppForm({
    formId: 'login',
    executeMutation,
    fieldConfig: loginFieldConfig,
    getOnValidSubmitHandler: getLoginOnValidSubmitHandler,
  });
};
