import { yupResolver } from '@hookform/resolvers/yup';
import { LoginMutation, useLoginMutation } from '../../graphql';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { gql } from 'urql';
import * as yup from 'yup';

import { AppFieldConfig, getFormOptions, getYupSchema } from '../appForm';
import { getOnValidSubmitHandler } from './helpers/getLoginOnSubmit';
import { LoginFieldValues, LoginVariables } from './helpers/loginTypes';
import { getMutationOnSubmit } from '../appForm/helpers/getMutationOnSubmit';

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
export const useLogin = () => {
  const [state, executeMutation] = useLoginMutation();

  const formRef = useRef<HTMLFormElement | null>(null);
  const [formError, setFormError] = useState<string | undefined>();
  const resolver = yupResolver(getYupSchema(loginFieldConfig));

  const { control, handleSubmit, formState, trigger } =
    useForm<LoginFieldValues>({
      resolver,
    });

  const onSubmit = getMutationOnSubmit<
    LoginFieldValues,
    LoginVariables,
    LoginMutation
  >({
    getOnValidSubmitHandler,
    executeMutation,
    setFormError,
    handleSubmit,
    formRef,
  });

  const formOptions = getFormOptions<LoginFieldValues>({
    formId: 'login',
    fieldConfig: loginFieldConfig,
    control,
    formState,
    trigger,
  });

  return { formRef, onSubmit, formError, control, formOptions };
};
