import {
  AppFormHandleError,
  GetOnValidMutationSubmitHandler,
} from '../../appForm';
import { RegisterFieldValues, RegisterVariables } from './registerTypes';
import { RegisterMutation } from '../../../graphql';
import Router from 'next/router';
import { getErrorHandler } from '../../appForm/helpers/getErrorHandler';

const registerHandleError: AppFormHandleError = (err, setFormError) => {
  if ('errorSummary' in err) {
    setFormError(err.errorSummary);
  } else {
    setFormError(JSON.stringify(err));
  }
};

export const getRegisterOnValidSubmitHandler: GetOnValidMutationSubmitHandler<
  RegisterFieldValues,
  RegisterVariables,
  RegisterMutation,
  never
> =
  ({ executeMutation, setFormError, setFieldError, formRef }) =>
  async (formFieldValues) => {
    try {
      const { username, email, password } = formFieldValues;
      const { data, error } = await executeMutation({
        username,
        email,
        password,
      });
      if (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const messageObj = (error?.graphQLErrors?.[0]?.originalError as any)
          ?.extensions?.exception?.data?.message?.[0]?.messages?.[0];
        const errorMessage =
          messageObj?.message ?? ('Unknown error registering' as string);
        if (errorMessage === 'Email already taken') {
          setFieldError('username', {
            message: 'Username is already taken',
            type: messageObj?.id,
          });
          getErrorHandler(formRef)({ username: errorMessage });
          return;
        } else if (errorMessage === 'Email is already taken.') {
          setFieldError('email', {
            message: 'Email is already taken',
            type: messageObj?.id,
          });
          getErrorHandler(formRef)({ email: errorMessage });
          return;
        }
        setFormError(errorMessage);
      } else {
        window.localStorage.setItem('token', data.register.jwt);
        Router.push('/');
      }
    } catch (err) {
      console.log({ err });
      registerHandleError(err, setFormError);
    }
  };
