import * as yup from 'yup';
import { AppFieldConfig } from './appFormTypes';
import Lazy from 'yup/lib/Lazy';

/** typed version of Object.keys */
// eslint-disable-next-line @typescript-eslint/ban-types
export const getKeys = Object.keys as <T extends object>(
  obj: T
) => Array<keyof T>;

/** given a fieldConfig, generate yup fields that will be used to generate the yup validation */
const getYupFields = (fieldConfig: AppFieldConfig) =>
  getKeys(fieldConfig).reduce((acc, fieldName) => {
    let yupField = fieldConfig[fieldName as string].yupValidation;
    if (fieldConfig[fieldName as string].required) {
      yupField = yupField.required();
    }
    if (fieldConfig[fieldName as string].label) {
      yupField = yupField.label(fieldConfig[fieldName as string].label);
    }
    acc[fieldName] = yupField;
    return acc;
  }, {} as { [fieldName: string]: yup.StringSchema<string | undefined> });

/** given a fieldConfig, generate yup validation schema used by yupResolver */
export const getYupSchema = (fieldConfig: AppFieldConfig) => {
  const yupFields = getYupFields(fieldConfig);
  return yup.object().shape(yupFields) as
    | Lazy<
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        any,
        unknown
      >
    | yup.AnyObjectSchema;
};
