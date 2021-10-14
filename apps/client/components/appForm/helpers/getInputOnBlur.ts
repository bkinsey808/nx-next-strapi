import { Path, UseFormTrigger } from 'react-hook-form/dist/types';
import { ChangeEvent } from 'react';

export const getInputOnBlur =
  <FormFieldTypes>({
    onBlur,
    trigger,
    name,
  }: {
    onBlur: () => void;
    trigger: UseFormTrigger<FormFieldTypes>;
    name: Path<FormFieldTypes>;
  }) =>
  (_e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    void trigger(name);
    onBlur();
  };
