import User from "./users.model";
import { User as userData } from "../../../lib/types";
import { logger } from "../utils/logger";

const user: any = {};

user.createOne = async (user: userData) => {
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

user.updateOne = async (username: string, payload: userData) => {
  logger.debug({ payload });
  const result = await User.findOneAndUpdate(
    {
      username: username,
    },
    payload
  );
  if (result) {
    return user.getByUserName(username);
  }
  return null;
};

export { user };
