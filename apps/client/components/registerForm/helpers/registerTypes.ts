// Unfortunately, yup.InferType does not work properly with the way I did getYupSchema
export interface RegisterFieldValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type RegisterVariables = Omit<RegisterFieldValues, 'confirmPassword'>;
