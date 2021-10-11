import * as yup from 'yup';
import { AppFieldConfig } from '../appForm';
import { getRegisterOnValidSubmitHandler } from './helpers/getRegisterOnValidSubmitHandler';
import { gql } from 'urql';
import { useAppForm } from '../appForm/useAppForm';
import { useRegisterMutation } from '../../graphql';

gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
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

export const registerFieldConfig: AppFieldConfig = {
  username: {
    label: 'Username',
    required: true,
    type: 'text',
    yupValidation: yup.string().min(3),
  },
  email: {
    label: 'Email',
    required: true,
    type: 'text',
    yupValidation: yup.string().email().min(3),
  },
  password: {
    label: 'Password',
    required: true,
    type: 'password',
    yupValidation: yup
      .string()
      .min(6)
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
        'Password must have a lower case letter, an uppercase letter, a numeral, and a special character'
      ),
  },
  confirmPassword: {
    label: 'Confirm Password',
    required: true,
    type: 'password',
    yupValidation: yup
      .string()
      .test('passwords-match', 'Confirm Password must match', function (value) {
        return this.parent.password === value;
      }),
  },
};

/** abstract non-display logic for Register component */
export const useRegisterForm = () => {
  const [_state, executeMutation] = useRegisterMutation();

  return useAppForm({
    formId: 'register',
    executeMutation,
    fieldConfig: registerFieldConfig,
    getOnValidSubmitHandler: getRegisterOnValidSubmitHandler,
  });
};
