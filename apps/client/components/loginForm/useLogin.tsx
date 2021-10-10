import { useLoginMutation } from '../../graphql';
import { gql } from 'urql';
import * as yup from 'yup';

import { AppFieldConfig } from '../appForm';
import { getLoginOnValidSubmitHandler } from './helpers/getLoginOnValidSubmitHandler';
import { useAppForm } from '../appForm/useAppForm';

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
export const useLogin = () =>
  useAppForm({
    formId: 'login',
    useMutation: useLoginMutation,
    fieldConfig: loginFieldConfig,
    getOnValidSubmitHandler: getLoginOnValidSubmitHandler,
  });
