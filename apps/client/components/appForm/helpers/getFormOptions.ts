import { AppFieldConfig, AppFormOptions } from './appFormTypes';
import { Control, FormState, UseFormTrigger } from 'react-hook-form';

/** add the control to the fieldConfig for consumption by field components */
export const getFormOptions = <FieldValues>({
  formId,
  fieldConfig,
  control,
  formState,
  trigger,
}: {
  formId: string;
  fieldConfig: AppFieldConfig;
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<FieldValues, object>;
  formState: FormState<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
}) => {
  return {
    formId,
    fieldConfig,
    control,
    formState,
    trigger,
  } as AppFormOptions<FieldValues>;
};
