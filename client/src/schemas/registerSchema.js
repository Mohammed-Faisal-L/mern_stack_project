import * as Yup from "yup";
import { MESSAGES } from "../constants/text-constants";

export const registerSchema = Yup.object({
  username: Yup.string().required(MESSAGES.REQUIRED_USERNAME),
  email: Yup.string()
    .email(MESSAGES.INVALID_EMAIL)
    .required(MESSAGES.REQUIRED_EMAIL),
  age: Yup.number()
    .positive(MESSAGES.AGE_POSITIVE)
    .integer(MESSAGES.AGE_INTEGER)
    .required(MESSAGES.REQUIRED_AGE)
    .typeError(MESSAGES.AGE_NUMBER),
  password: Yup.string()
    .min(6, MESSAGES.PASSWORD_MIN)
    .required(MESSAGES.REQUIRED_PASSWORD),
});
