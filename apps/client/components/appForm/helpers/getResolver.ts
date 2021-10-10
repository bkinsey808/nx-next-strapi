import { yupResolver } from '@hookform/resolvers/yup';
import { AppFieldConfig } from './appFormTypes';
import { getYupSchema } from './getYupSchema';

export const getResolver = (fieldConfig: AppFieldConfig) =>
  yupResolver(getYupSchema(fieldConfig));
