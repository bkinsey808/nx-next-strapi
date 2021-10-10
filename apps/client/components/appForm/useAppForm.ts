import { UseMutationResponse } from 'urql';
import { useRef, useState } from 'react';
import {
  AppFieldConfig,
  GetOnValidMutationSubmitHandler,
} from './helpers/appFormTypes';
import { getResolver } from './helpers/getResolver';
import { getMutationOnSubmit } from './helpers/getMutationOnSubmit';
import { useForm } from 'react-hook-form';
import { getFormOptions } from './helpers/getFormOptions';

export const useAppForm = <FormFieldValues, FormVariables, MutationType>({
  formId,
  useMutation,
  fieldConfig,
  getOnValidSubmitHandler,
}: {
  formId: string;
  useMutation: () => UseMutationResponse<MutationType, FormVariables>;
  fieldConfig: AppFieldConfig;
  getOnValidSubmitHandler: GetOnValidMutationSubmitHandler<
    FormFieldValues,
    FormVariables,
    MutationType
  >;
}) => {
  const [_state, executeMutation] = useMutation();

  const formRef = useRef<HTMLFormElement | null>(null);
  const [formError, setFormError] = useState<string | undefined>();
  const resolver = getResolver(fieldConfig);

  const { control, handleSubmit, formState, trigger } =
    useForm<FormFieldValues>({
      resolver,
    });

  const onSubmit = getMutationOnSubmit<
    FormFieldValues,
    FormVariables,
    MutationType
  >({
    getOnValidSubmitHandler,
    executeMutation,
    setFormError,
    handleSubmit,
    formRef,
  });

  const formOptions = getFormOptions<FormFieldValues>({
    formId,
    fieldConfig,
    control,
    formState,
    trigger,
  });

  return { formRef, onSubmit, formError, control, formOptions };
};
