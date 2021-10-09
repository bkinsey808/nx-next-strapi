import { ChangeEvent } from 'react';
import { Path, UseFormTrigger } from 'react-hook-form/dist/types';

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
  (_e: ChangeEvent<HTMLInputElement>) => {
    void trigger(name);
    onBlur();
  };