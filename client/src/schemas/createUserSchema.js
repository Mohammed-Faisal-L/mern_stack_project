import * as Yup from "yup";
import { MESSAGES } from "../constants/text-constants";

export const createUserSchema = Yup.object({
  name: Yup.string().required(MESSAGES.REQUIRED_NAME),
  email: Yup.string()
    .email(MESSAGES.INVALID_EMAIL)
    .required(MESSAGES.REQUIRED_EMAIL),
  age: Yup.number()
    .positive(MESSAGES.AGE_POSITIVE)
    .integer(MESSAGES.AGE_INTEGER)
    .required(MESSAGES.REQUIRED_AGE)
    .typeError(MESSAGES.AGE_NUMBER),
});
