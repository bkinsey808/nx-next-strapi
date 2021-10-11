import * as yup from 'yup';
import { AppFieldConfig } from '../appForm';
import { CreateCommentExtraVariables } from './helpers/createCommentTypes';
import { getCreateCommentOnValidSubmitHandler } from './helpers/getCreateCommentOnValidSubmitHandler';
import { useAppForm } from '../appForm/useAppForm';
import { useRouter } from 'next/router';

export const createCommentFieldConfig: AppFieldConfig = {
  comment: {
    label: 'Create Comment',
    required: true,
    type: 'text',
    yupValidation: yup.string(),
  },
};

/** abstracted non-display logic for CreateCommentForm component */
export const useCreateCommentForm = ({
  extraVariables,
}: {
  extraVariables: CreateCommentExtraVariables;
}) => {
  const router = useRouter();

  return useAppForm({
    formId: 'createComment',
    fieldConfig: createCommentFieldConfig,
    getOnValidSubmitHandler: getCreateCommentOnValidSubmitHandler,
    extraVariables,
    extraOptions: {
      router,
    },
  });
};
