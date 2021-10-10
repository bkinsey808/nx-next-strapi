import { Path, UseFormTrigger } from 'react-hook-form/dist/types';
import { ChangeEvent } from 'react';

export const getInputOnChange =
  <FormFieldTypes>({
    onChange,
    hasError,
    trigger,
    name,
  }: {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    hasError: boolean;
    trigger: UseFormTrigger<FormFieldTypes>;
    name: Path<FormFieldTypes>;
  }) =>
  (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    // only trigger error checking onChange if there was already an error
    // we don't want new errors onChange, only onBlur
    if (hasError) {
      void trigger(name);
    }
  };
