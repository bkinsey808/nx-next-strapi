import { MutableRefObject } from 'react';
import { FieldError } from 'react-hook-form';

export const getErrorHandler =
  (formRef: MutableRefObject<HTMLFormElement | null>) =>
  (errors: { [fieldName: string]: FieldError }) => {
    console.log({ formRef });
    console.log({ errors });
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
