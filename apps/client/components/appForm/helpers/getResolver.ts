import { AppFieldConfig } from './appFormTypes';
import { getYupSchema } from './getYupSchema';
import { yupResolver } from '@hookform/resolvers/yup';

export const getResolver = (fieldConfig: AppFieldConfig) =>
  yupResolver(getYupSchema(fieldConfig));
