import {
  AppFormHandleError,
  GetOnValidMutationSubmitHandler,
} from '../../appForm';
import { LoginFieldValues, LoginVariables } from './loginTypes';
import { LoginMutation } from '../../../graphql';
import Router from 'next/router';
// import { GetLoginOnSubmit, GetOnValidSubmitHandler } from './loginTypes';

const loginHandleError: AppFormHandleError = (err, setFormError) => {
  if ('errorSummary' in err) {
    setFormError(err.errorSummary);
  } else {
    setFormError(JSON.stringify(err));
  }
};

export const getLoginOnValidSubmitHandler: GetOnValidMutationSubmitHandler<
  LoginFieldValues,
  LoginVariables,
  LoginMutation
> =
  ({ executeMutation, setFormError }) =>
  async ({ username, password }) => {
    try {
      const { data, error } = await executeMutation({ username, password });
      if (error) {
        const isInvalid =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (error?.graphQLErrors?.[0]?.originalError as any)?.extensions
            ?.exception?.data?.message?.[0]?.messages?.[0]?.id ===
          'Auth.form.error.invalid';
        const errorMessage = isInvalid
          ? 'Username or Password is invalid'
          : 'Unknown error signing in';
        setFormError(errorMessage);
      } else {
        console.log('success!', { data });
        window.localStorage.setItem('token', data.login.jwt);
        Router.push('/');
      }
    } catch (err) {
      console.log({ err });
      loginHandleError(err, setFormError);
    }
  };
