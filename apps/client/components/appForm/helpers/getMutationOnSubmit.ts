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
  MutationType,
  ExtraVariables
>({
  getOnValidSubmitHandler,
  executeMutation,
  setFormError,
  setFieldError,
  handleSubmit,
  formRef,
  extraVariables,
}: {
  getOnValidSubmitHandler: GetOnValidMutationSubmitHandler<
    FormFieldValues,
    MutationVariables,
    MutationType,
    ExtraVariables
  >;
  executeMutation: (
    variables?: MutationVariables,
    context?: Partial<OperationContext>
  ) => Promise<OperationResult<MutationType, MutationVariables>>;
  setFormError: Dispatch<SetStateAction<string>>;
  setFieldError: UseFormSetError<FormFieldValues>;
  handleSubmit: UseFormHandleSubmit<FormFieldValues>;
  formRef;
  extraVariables?: ExtraVariables;
}): (() => void) =>
  handleSubmit(
    // this means the form itself is valid (on the client side)
    getOnValidSubmitHandler({
      executeMutation,
      setFormError,
      setFieldError,
      formRef,
      extraVariables,
    }),
    getErrorHandler(formRef)
  );
