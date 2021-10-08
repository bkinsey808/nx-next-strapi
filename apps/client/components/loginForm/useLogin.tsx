import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginMutation } from '../../graphql';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { gql } from 'urql';
import * as yup from 'yup';

import { AppFieldConfig, getFormOptions, getYupSchema } from '../appForm';
import { getLoginOnSubmit } from './helpers/getLoginOnSubmit';
import { LoginFieldValues } from './helpers/loginTypes';

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
  const [sessionToken, setSessionToken] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | undefined>();
  const resolver = yupResolver(getYupSchema(loginFieldConfig));

  const { control, handleSubmit, formState, trigger } =
    useForm<LoginFieldValues>({
      resolver,
    });

  const onSubmit = getLoginOnSubmit({
    executeMutation,
    setSessionToken,
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

  return { sessionToken, formRef, onSubmit, formError, control, formOptions };
};
