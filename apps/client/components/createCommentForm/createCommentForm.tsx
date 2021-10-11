import { AppButton, AppForm, AppTextField } from '../appForm';
import { CreateCommentFieldValues } from './helpers/createCommentTypes';
import { FC } from 'react';
import { OperationContext } from 'urql';
import { useCreateCommentForm } from './useCreateCommentForm';
import { useRouter } from 'next/router';

interface CreateCommentFormProps {
  postId: string;
}

const CreateCommentForm: FC<CreateCommentFormProps> = ({ postId }) => {
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

export default CreateCommentForm;
