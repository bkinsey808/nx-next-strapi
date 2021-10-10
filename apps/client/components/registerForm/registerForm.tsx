import { AppForm, AppTextField, AppButton } from '../appForm';
import { RegisterFieldValues } from './helpers/registerTypes';
import { useRegister } from './useRegister';

export function RegisterForm() {
  const { formRef, onSubmit, formError, formOptions } = useRegister();
  console.log({ formOptions });
  return (
    <AppForm ref={formRef} onSubmit={onSubmit} formError={formError}>
      <AppTextField<RegisterFieldValues>
        name="username"
        formOptions={formOptions}
      />
      <AppTextField<RegisterFieldValues>
        name="email"
        formOptions={formOptions}
      />
      <AppTextField<RegisterFieldValues>
        name="password"
        formOptions={formOptions}
      />
      <AppTextField<RegisterFieldValues>
        name="confirmPassword"
        formOptions={formOptions}
      />
      <AppButton type="submit">Register</AppButton>
    </AppForm>
  );
}

export default RegisterForm;
