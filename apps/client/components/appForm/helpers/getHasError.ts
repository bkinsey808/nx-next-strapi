import {
  DeepMap,
  DeepPartial,
  UnionLike,
  FormState,
} from 'react-hook-form/dist/types';

import { getHelperText } from './getHelperText';

export const getHasError = <FormFieldTypes>(
  fieldName: string,
  formState: FormState<FormFieldTypes>
) => {
  const hasHelperText = !!getHelperText(fieldName, formState);
  const isSubmitted = formState.isSubmitted;
  const isTouched =
    !!formState.touchedFields[
      fieldName as unknown as keyof DeepMap<
        DeepPartial<UnionLike<FormFieldTypes>>,
        true
      >
    ];

  return (isTouched || isSubmitted) && hasHelperText;
};
