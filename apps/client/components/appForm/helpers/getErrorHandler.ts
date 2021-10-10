import { FieldError } from 'react-hook-form';
import { MutableRefObject } from 'react';

export const getErrorHandler =
  (formRef: MutableRefObject<HTMLFormElement | null>) =>
  (errors: { [fieldName: string]: FieldError }) => {
    const elements = formRef?.current?.elements || [];
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const name = el.getAttribute('name');
      if (name && name in errors) {
        (el as HTMLElement).focus();
        break;
      }
    }
  };
