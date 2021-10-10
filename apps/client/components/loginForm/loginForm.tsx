import { AppForm, AppTextField, AppButton } from '../appForm';
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
      <AppButton type="submit">Login</AppButton>
    </AppForm>
  );
}

export default LoginForm;
