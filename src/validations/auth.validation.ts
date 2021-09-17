import { email, phone } from "./custom.validation";
import Joi from "joi";

// type userAttr =keyof UserAttributes
// var IMyTable: (keyof UserAttributes)[] = ["uuid", "title", "createdAt", "isDeleted"];

const signup = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().custom(email),
    phone: Joi.string().required().custom(phone),
  }),
};

export default {
  signup,
};
