import CreateCommentForm from '../components/createCommentForm/createCommentForm';
import { withAuthUrqlClient } from '../helpers/withAppUrqlClient';

function CreateComment() {
  return (
    <>
      <CreateCommentForm />
    </>
  );
}

export default withAuthUrqlClient(CreateComment);
