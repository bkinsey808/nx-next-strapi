import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterMutation, useRegisterMutation } from '../../graphql';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { gql } from 'urql';
import * as yup from 'yup';

import { AppFieldConfig, getFormOptions, getYupSchema } from '../appForm';
import { getOnValidSubmitHandler } from './helpers/getRegisterOnSubmit';
import {
  RegisterFieldValues,
  RegisterVariables,
} from './helpers/registerTypes';
import { getMutationOnSubmit } from '../appForm/helpers/getMutationOnSubmit';

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
export const useRegister = () => {
  const [state, executeMutation] = useRegisterMutation();

  const formRef = useRef<HTMLFormElement | null>(null);
  const [formError, setFormError] = useState<string | undefined>();
  const resolver = yupResolver(getYupSchema(registerFieldConfig));

  const { control, handleSubmit, formState, trigger } =
    useForm<RegisterFieldValues>({
      resolver,
    });

  const onSubmit = getMutationOnSubmit<
    RegisterFieldValues,
    RegisterVariables,
    RegisterMutation
  >({
    getOnValidSubmitHandler,
    executeMutation,
    setFormError,
    handleSubmit,
    formRef,
  });

  const formOptions = getFormOptions<RegisterFieldValues>({
    formId: 'register',
    fieldConfig: registerFieldConfig,
    control,
    formState,
    trigger,
  });

  return { formRef, onSubmit, formError, control, formOptions };
};
