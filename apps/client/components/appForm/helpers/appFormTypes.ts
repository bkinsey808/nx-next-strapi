import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import {
  Control,
  FormState,
  UnpackNestedValue,
  UseFormHandleSubmit,
  UseFormTrigger,
} from 'react-hook-form/dist/types';
import { OperationContext, OperationResult } from 'urql';
import * as yup from 'yup';
import { RequiredStringSchema } from 'yup/lib/string';

export interface AppFieldConfig {
  [fieldName: string]: {
    label: string;
    required?: boolean;
    type: 'text' | 'password';
    yupValidation: //eslint-disable-next-line @typescript-eslint/no-explicit-any
    | RequiredStringSchema<string | undefined, Record<string, any>>
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      | yup.StringSchema<string | undefined, Record<string, any>>;
  };
}

export type AppFormOptions<FieldValues> = {
  formId: string;
  fieldConfig: AppFieldConfig;
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<FieldValues, object>;
  formState: FormState<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
};

export type AppFormHandleError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  setFormError: Dispatch<SetStateAction<string | undefined>>
) => void;

export interface GetOnSubmitOptions<
  FormFieldValues,
  MutationVariables,
  MutationType
> {
  executeMutation: (
    variables?: MutationVariables,
    context?: Partial<OperationContext>
  ) => Promise<OperationResult<MutationType, MutationVariables>>;
  setFormError: Dispatch<SetStateAction<string | undefined>>;
  handleSubmit: UseFormHandleSubmit<FormFieldValues>;
  formRef: MutableRefObject<HTMLFormElement | null>;
}

export type GetMutationOnSubmit<
  FormFieldValues,
  MutationVariables,
  MutationType
> = (
  options: GetOnSubmitOptions<FormFieldValues, MutationVariables, MutationType>
) => () => void;

export type GetOnValidMutationSubmitHandler<
  FormFieldValues,
  MutationVariables,
  MutationType
> = (
  options: Omit<
    GetOnSubmitOptions<FormFieldValues, MutationVariables, MutationType>,
    'handleSubmit' | 'formRef'
  >
) => (
  confirmFieldValues: UnpackNestedValue<MutationVariables>
) => Promise<void>;
