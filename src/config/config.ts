import Joi from "joi";
import dotenv from "dotenv";
dotenv.config();

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().default("development"),
    REGION: Joi.string().default("eu-west-2"),
    PORT: Joi.number().default(8000),
    JWT_SECRET: Joi.string()
      .description("JWT secret key")
      .default("jwt-token-secret"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(90)
      .description("days after which refresh tokens expire"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  ...process.env,
  env: envVars.NODE_ENV,
  PORT: envVars.PORT,
  REGION: envVars.REGION,
  NODE_ENV: envVars.NODE_ENV,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },
};
