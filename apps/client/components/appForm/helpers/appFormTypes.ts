import { Dispatch, SetStateAction } from 'react';
import { Control, FormState, UseFormTrigger } from 'react-hook-form/dist/types';
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
