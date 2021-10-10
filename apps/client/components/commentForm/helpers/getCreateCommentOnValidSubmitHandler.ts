import {
  AppFormHandleError,
  GetOnValidMutationSubmitHandler,
} from '../../appForm';
import {
  CreateCommentFieldValues,
  CreateCommentVariables,
} from './createCommentTypes';
import { CreateCommentMutation } from '../../../graphql';
import Router from 'next/router';
import { getErrorHandler } from '../../appForm/helpers/getErrorHandler';

const createCommentHandleError: AppFormHandleError = (err, setFormError) => {
  if ('errorSummary' in err) {
    setFormError(err.errorSummary);
  } else {
    setFormError(JSON.stringify(err));
  }
};

export const getCreateCommentOnValidSubmitHandler: GetOnValidMutationSubmitHandler<
  CreateCommentFieldValues,
  CreateCommentVariables,
  CreateCommentMutation
> =
  ({ executeMutation, setFormError, setFieldError, formRef }) =>
  async (formFieldValues) => {
    try {
      const { comment } = formFieldValues;
      // const { data, error } = await executeMutation({ comment });
      // if (error) {
      //   // setFormError(errorMessage);
      // } else {
      //   window.localStorage.setItem('token', data.register.jwt);
      //   Router.push('/');
      // }
    } catch (err) {
      console.log({ err });
      createCommentHandleError(err, setFormError);
    }
  };
