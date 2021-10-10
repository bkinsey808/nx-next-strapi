import * as yup from 'yup';
import {
  Control,
  FormState,
  UnpackNestedValue,
  UseFormHandleSubmit,
  UseFormSetError,
  UseFormTrigger,
} from 'react-hook-form/dist/types';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { OperationContext, OperationResult } from 'urql';
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
  clearErrors;
};

export type AppFormHandleError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  setFormError: Dispatch<SetStateAction<string | undefined>>
) => void;

export interface GetOnSubmitOptions<
  FormFieldValues,
  MutationVariables,
  MutationType,
  ExtraVariables
> {
  executeMutation: (
    variables?: MutationVariables,
    context?: Partial<OperationContext>
  ) => Promise<OperationResult<MutationType, MutationVariables>>;
  setFormError: Dispatch<SetStateAction<string | undefined>>;
  setFieldError: UseFormSetError<FormFieldValues>;
  handleSubmit: UseFormHandleSubmit<FormFieldValues>;
  formRef: MutableRefObject<HTMLFormElement | null>;
  extraVariables: ExtraVariables;
}

export type GetMutationOnSubmit<
  FormFieldValues,
  MutationVariables,
  MutationType,
  ExtraVariables
> = (
  options: GetOnSubmitOptions<
    FormFieldValues,
    MutationVariables,
    MutationType,
    ExtraVariables
  >
) => () => void;

export type GetOnValidMutationSubmitHandler<
  FormFieldValues,
  MutationVariables,
  MutationType,
  ExtraVariables
> = (
  options: Omit<
    GetOnSubmitOptions<
      FormFieldValues,
      MutationVariables,
      MutationType,
      ExtraVariables
    >,
    'handleSubmit'
  >
) => (confirmFieldValues: UnpackNestedValue<FormFieldValues>) => Promise<void>;
