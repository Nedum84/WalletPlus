import { Request, Response } from "express";
import ApiResponse from "../apiresponse/api.response";
import authService from "../services/auth.service";

const signup = async (req: Request, res: Response) => {
  const user = await authService.signup(req.body);
  const tokens = await authService.generateAuthTokens(user);
  ApiResponse.created(res, {
    user,
    tokens,
  });
};

export default { signup };
