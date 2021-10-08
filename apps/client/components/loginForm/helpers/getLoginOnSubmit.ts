import { AppFormHandleError, getErrorHandler } from '../../appForm';
import { GetLoginOnSubmit, GetOnValidSubmitHandler } from './loginTypes';

const loginHandleError: AppFormHandleError = (err, setFormError) => {
  if ('errorSummary' in err) {
    setFormError(err.errorSummary);
  } else {
    setFormError(JSON.stringify(err));
  }
};

const getOnValidSubmitHandler: GetOnValidSubmitHandler =
  ({ executeMutation, setSessionToken, setFormError }) =>
  async ({ username, password }) => {
    try {
      const { data, error } = await executeMutation({ username, password });
      console.log({ data, error });
      console.log(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error?.graphQLErrors?.[0]?.originalError as any)?.extensions?.exception
          ?.data?.message?.[0]?.messages?.[0]?.message
      );
    } catch (err) {
      loginHandleError(err, setFormError);
    }
  };

/** handleSubmit from RHF takes an onValid submit handler */
export const getLoginOnSubmit: GetLoginOnSubmit = ({
  executeMutation,
  setSessionToken,
  setFormError,
  handleSubmit,
  formRef,
}) => {
  return handleSubmit(
    // this means the form itself is valid (on the client side)
    getOnValidSubmitHandler({ executeMutation, setSessionToken, setFormError }),
    getErrorHandler(formRef)
  );
};
