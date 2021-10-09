import { memo } from 'react';
import { Controller } from 'react-hook-form';
import {
  Control,
  Path,
  PathValue,
  UnpackNestedValue,
} from 'react-hook-form/dist/types';

import { AppFormOptions } from './helpers/appFormTypes';
import { getHasError } from './helpers/getHasError';
import { getHelperText } from './helpers/getHelperText';
import { getInputOnBlur } from './helpers/getInputOnBlur';
import { getInputOnChange } from './helpers/getInputOnChange';

interface AppTextFieldProps<FormFieldTypes> {
  name: Path<FormFieldTypes>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  control?: Control<FormFieldTypes, object>;
  label?: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
  formOptions?: AppFormOptions<FormFieldTypes>;
}

// Fun fact: you can't use React.FC for components with generics
// see https://stackoverflow.com/questions/59947787/generictype-in-react-fcpropst#59947930
// Also, in order to use generics inside the function body, you need to type the function itself,
// not the constant the function is assigned to.
// see https://stackoverflow.com/questions/53320261/typescript-can-i-use-generic-type-in-function-body#53321037
export const UnmemoizedAppTextField = <FormFieldTypes,>({
  name,
  defaultValue = '',
  formOptions,
  required = formOptions?.fieldConfig?.[name]?.required ?? false,
  label = formOptions?.fieldConfig?.[name]?.label ?? '',
  type = formOptions?.fieldConfig?.[name]?.type ?? 'text',
  control = formOptions?.control,
}: AppTextFieldProps<FormFieldTypes>): JSX.Element | null => {
  const formState = formOptions?.formState;
  const trigger = formOptions?.trigger;
  if (!formState || !trigger) {
    return null;
  }
  const hasError = getHasError(name, formState);
  const labelId = `${formOptions.formId}-${name}-label`;
  const inputId = `${formOptions.formId}-${name}-input`;

  return (
    <>
      <label id={labelId} htmlFor={inputId}>
        {label}
      </label>
      <Controller
        control={control}
        name={name as unknown as Path<FormFieldTypes>}
        defaultValue={
          defaultValue as UnpackNestedValue<
            PathValue<FormFieldTypes, Path<FormFieldTypes>>
          >
        }
        render={({ field: { onChange, onBlur, value } }) => (
          <input
            id={inputId}
            required={required}
            value={value}
            onChange={getInputOnChange({ onChange, hasError, trigger, name })}
            onBlur={getInputOnBlur({ onBlur, trigger, name })}
            type={type}
            aria-labelledby={labelId}
            name={name}
          />
        )}
      />
      <div>{hasError && getHelperText(name, formState)}</div>
    </>
  );
};

// unfortunately, doing the memo as a second step like this seems to be
// necessary in order to perfectly preserve the generics props.
export const AppTextField = memo(
  UnmemoizedAppTextField
) as typeof UnmemoizedAppTextField & { displayName: string };
AppTextField.displayName = 'AppTextField';