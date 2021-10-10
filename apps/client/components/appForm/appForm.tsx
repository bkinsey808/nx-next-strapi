import { ReactNode, forwardRef } from 'react';
import { ErrorText } from './errorText';  

interface AppFormProps {
  onSubmit: () => void;
  formError?: string;
  children: ReactNode;
}

export const AppForm = forwardRef<HTMLFormElement, AppFormProps>(
  ({ onSubmit, formError, children }, formRef) => {
    return (
      <form ref={formRef} onSubmit={onSubmit} noValidate>
        {formError && <ErrorText>{formError}</ErrorText>}
        {children}
      </form>
    );
  }
);
AppForm.displayName = 'AppForm';
