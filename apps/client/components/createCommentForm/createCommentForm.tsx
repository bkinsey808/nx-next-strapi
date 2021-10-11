import { AppButton, AppForm, AppTextField } from '../appForm';
import { CreateCommentFieldValues } from './helpers/createCommentTypes';
import { FC } from 'react';
import { useCreateCommentForm } from './useCreateCommentForm';

interface CreateCommentFormProps {
  postId: string;
}

export const CreateCommentForm: FC<CreateCommentFormProps> = ({ postId }) => {
  const { formRef, onSubmit, formError, formOptions } = useCreateCommentForm({
    extraVariables: { postId },
  });

  return (
    <AppForm ref={formRef} onSubmit={onSubmit} formError={formError}>
      <AppTextField<CreateCommentFieldValues>
        name="comment"
        formOptions={formOptions}
      />
      <AppButton type="submit">Add Comment</AppButton>
    </AppForm>
  );
};
