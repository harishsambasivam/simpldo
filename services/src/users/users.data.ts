import { User as userData } from "./users.router";
import User from "./users.model";
import { logger } from "../utils/logger";

const user: any = {};

user.create = async (user: userData) => {
  const data = (await User.create(user)).toJSON();
  logger.debug(data);
  return data;
};

user.getByUserName = async (username: string) => {
  const data = await User.findOne({
    username: username,
  });
  logger.debug(data);
  return data;
};

user.update = () => {};

export default user;
