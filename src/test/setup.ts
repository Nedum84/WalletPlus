import FakeUser from "./factories/user.fake";
import { UserAttributes } from "../models/user.model";
import { sequelize } from "../models/db.con";
import authService from "../services/auth.service";

interface SignInData {
  user: UserAttributes;
  tokens: {
    access: {
      token: string;
      expires: Date;
    };
    refresh: {
      token: string;
      expires: Date;
    };
  };
}
declare global {
  var signin: () => Promise<SignInData>;
}

jest.setTimeout(20000);

beforeAll(async () => {
  await sequelize.sync({ force: true });

  process.env.JWT_SECRET =
    "48f234b26ecdd84220f1a8a85d13496874041d6b1eab09c4506ae152c2bebd0a";
  process.env.JWT_ACCESS_EXPIRATION_MINUTES = "150";
  process.env.JWT_REFRESH_EXPIRATION_DAYS = "90";
  process.env.RESET_PASSWORD_EXPIRATION_MINUTES = "10";
});

beforeEach(async () => {
  jest.clearAllMocks();

  await sequelize.sync({ force: true });
  // await clearTestDb();
});

afterAll(async () => {
  await sequelize.close();
});

global.signin = async () => {
  // let user:any = {
  //   user_id:12,
  //   email:"nelly@gmail.com",
  //   uuid:"56789oiu56789093456hg",
  //   role:"user"
  // }
  const user = await FakeUser();
  const tokens = await authService.generateAuthTokens(user);

  return { tokens, user };
};
