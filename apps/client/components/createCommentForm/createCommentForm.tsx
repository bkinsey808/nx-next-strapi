import { AppButton, AppForm, AppTextField } from '../appForm';
import { CreateCommentFieldValues } from './helpers/createCommentTypes';
import { useCreateCommentForm } from './useCreateCommentForm';
import { withAuthUrqlClient } from '../../helpers/withAppUrqlClient';

function CreateCommentForm() {
  const { formRef, onSubmit, formError, formOptions } = useCreateCommentForm({
    postId: '1',
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
