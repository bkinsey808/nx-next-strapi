import { AppForm, AppTextField } from '../appForm';
import { LoginFieldValues } from './helpers/loginTypes';
import { useLogin } from './useLogin';

export function LoginForm() {
  const { formRef, onSubmit, formError, formOptions } = useLogin();

  return (
    <AppForm ref={formRef} onSubmit={onSubmit} formError={formError}>
      <AppTextField<LoginFieldValues>
        name="username"
        formOptions={formOptions}
      />
      <AppTextField<LoginFieldValues>
        name="password"
        formOptions={formOptions}
      />
      <button
        className="block bg-teal hover:bg-teal-dark text-white uppercase text-lg mx-auto p-4 rounded"
        type="submit"
      >
        Submit
      </button>
    </AppForm>
  );
}

export default LoginForm;
