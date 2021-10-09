// Unfortunately, yup.InferType does not work properly with the way I did getYupSchema
export interface LoginFieldValues {
  username: string;
  password: string;
}

export type LoginVariables = LoginFieldValues;
