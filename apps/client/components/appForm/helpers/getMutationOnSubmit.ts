import { Dispatch, SetStateAction } from 'react';
import { OperationContext, OperationResult } from 'urql';
import {
  UseFormHandleSubmit,
  UseFormSetError,
} from 'react-hook-form/dist/types';
import { GetOnValidMutationSubmitHandler } from './appFormTypes';
import { getErrorHandler } from './getErrorHandler';

/** handleSubmit from RHF takes an onValid submit handler */
export const getMutationOnSubmit = <
  FormFieldValues,
  MutationVariables,
  MutationType
>({
  getOnValidSubmitHandler,
  executeMutation,
  setFormError,
  setFieldError,
  handleSubmit,
  formRef,
}: {
  getOnValidSubmitHandler: GetOnValidMutationSubmitHandler<
    FormFieldValues,
    MutationVariables,
    MutationType
  >;
  executeMutation: (
    variables?: MutationVariables,
    context?: Partial<OperationContext>
  ) => Promise<OperationResult<MutationType, MutationVariables>>;
  setFormError: Dispatch<SetStateAction<string>>;
  setFieldError: UseFormSetError<FormFieldValues>;
  handleSubmit: UseFormHandleSubmit<FormFieldValues>;
  formRef;
}): (() => void) =>
  handleSubmit(
    // this means the form itself is valid (on the client side)
    getOnValidSubmitHandler({ executeMutation, setFormError, setFieldError, formRef }),
    getErrorHandler(formRef)
  );
