import { ReactNode, forwardRef } from 'react';

interface AppFormProps {
  onSubmit: () => void;
  formError?: string;
  children: ReactNode;
}

export const AppForm = forwardRef<
  HTMLFormElement,
  AppFormProps
  // eslint-disable-next-line react/prop-types
>(({ onSubmit, formError, children }, formRef) => {
  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate>
      {formError && <div>{formError}</div>}
      {children}
    </form>
  );
});
AppForm.displayName = 'AppForm';
