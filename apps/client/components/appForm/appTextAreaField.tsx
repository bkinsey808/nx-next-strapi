import {
  Control,
  Path,
  PathValue,
  UnpackNestedValue,
} from 'react-hook-form/dist/types';
import { AppFormOptions } from './helpers/appFormTypes';
import { Controller } from 'react-hook-form';
import { ErrorText } from './errorText';
import { getHasError } from './helpers/getHasError';
import { getHelperText } from './helpers/getHelperText';
import { getInputOnBlur } from './helpers/getInputOnBlur';
import { getInputOnChange } from './helpers/getInputOnChange';
import { memo } from 'react';

interface AppTextAreaFieldProps<FormFieldTypes> {
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
export const UnmemoizedAppTextAreaField = <FormFieldTypes,>({
  name,
  defaultValue = '',
  formOptions,
  required = formOptions?.fieldConfig?.[name]?.required ?? false,
  label = formOptions?.fieldConfig?.[name]?.label ?? '',
  control = formOptions?.control,
}: AppTextAreaFieldProps<FormFieldTypes>): JSX.Element | null => {
  const formState = formOptions?.formState;
  const trigger = formOptions?.trigger;

  if (!formState || !trigger) {
    return null;
  }

  const hasError = getHasError(name, formState);
  const labelId = `${formOptions.formId}-${name}-label`;
  const inputId = `${formOptions.formId}-${name}-input`;

  return (
    <div
      className="
        py-3
        mb-3
      "
    >
      <label
        id={labelId}
        className="
          block 
          uppercase 
          tracking-wide 
          text-gray-700 
          text-xs 
          font-bold mb-2
        "
        htmlFor={inputId}
      >
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
          <textarea
            id={inputId}
            className={`
              appearance-none 
              block 
              w-full 
              bg-gray-100 
              text-gray-700 
              border
              border-gray-700
              rounded 
              py-1
              px-4 
              leading-tight 
              focus:outline-none 
              focus:bg-white 
              ${hasError && 'border-red-500'}
            `}
            required={required}
            value={value}
            onChange={getInputOnChange({ onChange, hasError, trigger, name })}
            onBlur={getInputOnBlur({ onBlur, trigger, name })}
            aria-labelledby={labelId}
            name={name}
          />
        )}
      />
      <ErrorText>{hasError && getHelperText(name, formState)}</ErrorText>
    </div>
  );
};

// unfortunately, doing the memo as a second step like this seems to be
// necessary in order to perfectly preserve the generics props.
export const AppTextAreaField = memo(
  UnmemoizedAppTextAreaField
) as typeof UnmemoizedAppTextAreaField & { displayName: string };
AppTextAreaField.displayName = 'AppTextAreaField';
