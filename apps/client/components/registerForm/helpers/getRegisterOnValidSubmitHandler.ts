import { RegisterMutation } from '../../../graphql';
import Router from 'next/router';
import {
  AppFormHandleError,
  GetOnValidMutationSubmitHandler,
} from '../../appForm';
import { RegisterFieldValues, RegisterVariables } from './registerTypes';

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
  RegisterMutation
> =
  ({ executeMutation, setFormError }) =>
  async (variables) => {
    try {
      const { data, error } = await executeMutation(variables);
      if (error) {
        const isInvalid =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (error?.graphQLErrors?.[0]?.originalError as any)?.extensions
            ?.exception?.data?.message?.[0]?.messages?.[0]?.id ===
          'Auth.form.error.invalid';
        const errorMessage = isInvalid
          ? 'Username or Password is invalid'
          : 'Unknown error registering';
        setFormError(errorMessage);
      } else {
        console.log('success!', { data });
        window.localStorage.setItem('token', data.register.jwt);
        Router.push('/');
      }
    } catch (err) {
      console.log({ err });
      registerHandleError(err, setFormError);
    }
  };
