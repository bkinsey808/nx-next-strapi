import { AppButton, AppForm, AppTextField } from '../appForm';
import { CreateCommentFieldValues } from './helpers/createCommentTypes';
import { useCreateCommentForm } from './useCreateCommentForm';
import { useRouter } from 'next/router';

function CreateCommentForm() {
  const router = useRouter();
  const postId = router.query.postId as string;
  const { formRef, onSubmit, formError, formOptions } = useCreateCommentForm({
    postId,
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
}

export default CreateCommentForm;
