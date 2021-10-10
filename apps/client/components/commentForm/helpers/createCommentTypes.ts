// Unfortunately, yup.InferType does not work properly with the way I did getYupSchema
export interface CreateCommentFieldValues {
  comment: string;
}

export type CreateCommentVariables = CreateCommentFieldValues;
