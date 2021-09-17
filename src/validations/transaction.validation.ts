// import { object, string, required, any, date } from "joi";
import Joi from "joi";

const addMoney = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
  }),
};

const sendMoney = {
  body: Joi.object().keys({
    to: Joi.number().required(),
    amount: Joi.number().required(),
  }),
};

export default {
  addMoney,
  sendMoney,
};
