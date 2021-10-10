import {
  DeepMap,
  DeepPartial,
  FieldError,
  FormState,
  UnionLike,
} from 'react-hook-form/dist/types';

export const getHelperText = <FormFieldTypes>(
  fieldName: string,
  formState: FormState<FormFieldTypes>
) =>
  (
    formState.errors[
      fieldName as unknown as keyof DeepMap<
        DeepPartial<UnionLike<FormFieldTypes>>,
        FieldError
      >
    ] as { message?: string }
  )?.message;
