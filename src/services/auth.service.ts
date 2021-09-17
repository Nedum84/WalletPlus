import jwt from "jsonwebtoken";
import { User, UserAttributes } from "../models/user.model";
import { v4 as uuidv4 } from "uuid";
import { ErrorResponse } from "../apiresponse/error.response";
import moment from "moment";
import config from "../config/config";
import httpStatus from "http-status";

const signup = async (userBody: UserAttributes) => {
  const { phone, email } = userBody;

  userBody.uuid = uuidv4();

  // Check if Phone is taken
  const isPhoneTaken = await User.findOne({
    where: { phone },
  });
  if (!!isPhoneTaken) throw new ErrorResponse("Phone Number is already taken");

  // Check if is Email is taken
  const isEmailTaken = await User.findOne({
    where: { email },
  });
  if (email && !!isEmailTaken) {
    throw new ErrorResponse("Email already taken");
  }

  const user = await User.create(userBody);
  if (!user) {
    throw new ErrorResponse("Error occured while creating user");
  }
  return user;
};
const getUserById = async (user_id: number) => {
  const user = await User.findOne({ where: { user_id } });
  if (!user) {
    throw new ErrorResponse("User not found", httpStatus.NOT_FOUND);
  }
  return user;
};
const generateAuthTokens = async (user: UserAttributes) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(
    { user_id: user.user_id, uuid: user.uuid },
    accessTokenExpires,
    "access"
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days"
  );
  const refreshToken = generateToken(
    { user_id: user.user_id, uuid: user.uuid },
    refreshTokenExpires,
    "refresh"
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};
const generateToken = (
  data: object,
  expires: moment.Moment,
  tokenType: string,
  secret = config.jwt.secret
): string => {
  const payload = {
    user: data,
    iat: moment().unix(),
    exp: expires.unix(),
    type: tokenType,
  };

  return jwt.sign(payload, secret);
};
export default { signup, getUserById, generateAuthTokens };
