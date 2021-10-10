import { Dispatch, SetStateAction } from 'react';
import { OperationContext, OperationResult } from 'urql';
import { GetOnValidMutationSubmitHandler } from './appFormTypes';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types';
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
  handleSubmit: UseFormHandleSubmit<FormFieldValues>;
  formRef;
}): (() => void) =>
  handleSubmit(
    // this means the form itself is valid (on the client side)
    getOnValidSubmitHandler({ executeMutation, setFormError }),
    getErrorHandler(formRef)
  );
