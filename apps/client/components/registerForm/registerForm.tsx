import { AppForm, AppTextField } from '../appForm';
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
      <button
        className="block bg-teal hover:bg-teal-dark text-white uppercase text-lg mx-auto p-4 rounded"
        type="submit"
      >
        Submit
      </button>
    </AppForm>
  );
}

export default RegisterForm;
