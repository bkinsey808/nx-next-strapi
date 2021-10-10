import {
  AppFieldConfig,
  GetOnValidMutationSubmitHandler,
} from './helpers/appFormTypes';
import { useRef, useState } from 'react';
import { UseMutationResponse } from 'urql';
import { getFormOptions } from './helpers/getFormOptions';
import { getMutationOnSubmit } from './helpers/getMutationOnSubmit';
import { getResolver } from './helpers/getResolver';
import { useForm } from 'react-hook-form';

export const useAppForm = <
  FormFieldValues,
  MutationVariables,
  MutationType,
  ExtraVariables
>({
  formId,
  useMutation,
  fieldConfig,
  getOnValidSubmitHandler,
  extraVariables,
}: {
  formId: string;
  useMutation: () => UseMutationResponse<MutationType, MutationVariables>;
  fieldConfig: AppFieldConfig;
  getOnValidSubmitHandler: GetOnValidMutationSubmitHandler<
    FormFieldValues,
    MutationVariables,
    MutationType,
    ExtraVariables
  >;
  extraVariables?: ExtraVariables;
}) => {
  const [_state, executeMutation] = useMutation();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formError, setFormError] = useState<string | undefined>();
  const resolver = getResolver(fieldConfig);

  const {
    control,
    handleSubmit,
    formState,
    trigger,
    setError: setFieldError,
  } = useForm<FormFieldValues>({
    resolver,
  });

  const onSubmit = getMutationOnSubmit({
    getOnValidSubmitHandler,
    executeMutation,
    setFormError,
    setFieldError,
    handleSubmit,
    formRef,
    extraVariables,
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
