import * as yup from 'yup';
import { AppFieldConfig } from '../appForm';
import { CreateCommentExtraVariables } from './helpers/createCommentTypes';
import { getCreateCommentOnValidSubmitHandler } from './helpers/getCreateCommentOnValidSubmitHandler';
import { useAppForm } from '../appForm/useAppForm';
import { useCreateCommentMutation } from '../../graphql';

export const createCommentFieldConfig: AppFieldConfig = {
  comment: {
    label: 'Create Comment',
    required: true,
    type: 'text',
    yupValidation: yup.string(),
  },
};

/** abstract non-display logic for CreateCommentForm component */
export const useCreateCommentForm = (
  extraVariables: CreateCommentExtraVariables
) =>
  useAppForm({
    formId: 'createComment',
    useMutation: useCreateCommentMutation,
    fieldConfig: createCommentFieldConfig,
    getOnValidSubmitHandler: getCreateCommentOnValidSubmitHandler,
    extraVariables,
  });
