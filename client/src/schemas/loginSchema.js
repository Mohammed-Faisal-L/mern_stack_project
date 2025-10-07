import * as Yup from "yup";
import { MESSAGES } from "../constants/text-constants";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email(MESSAGES.INVALID_EMAIL)
    .required(MESSAGES.REQUIRED_EMAIL),
  password: Yup.string()
    .min(6, MESSAGES.PASSWORD_MIN)
    .required(MESSAGES.REQUIRED_PASSWORD),
});
