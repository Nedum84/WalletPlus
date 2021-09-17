import faker from "faker";
import { User, UserAttributes } from "../../models/user.model";
/**
 * Generate an object which container attributes needed
 * to successfully create a wallet instance.
 *
 * @param  {Object} props Properties to use for the wallet.
 *
 * @return {Object}       An object to build the wallet from.
 */
const data = (props: object = {}): any => {
  const defaultProps = {
    uuid: faker.datatype.uuid(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
  };
  return { ...defaultProps, ...props };
};

/**
 * Generates a wallet instance from the properties provided.
 *
 * @return {UserAttributes}       A wallet instance
 */
export = async (): Promise<UserAttributes> => await User.create(data());
