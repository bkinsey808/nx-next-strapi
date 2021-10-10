import { AppButton, AppForm, AppTextField } from '../appForm';
import { LoginFieldValues } from './helpers/loginTypes';
import { useLoginForm } from './useLoginForm';

export function LoginForm() {
  const { formRef, onSubmit, formError, formOptions } = useLoginForm();

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
