// @ts-ignore
import passwordValidator from "password-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";
import { User } from "./users.router";
import { APIError } from "../../../lib/errors";

const { saltRounds, secret, accessTokenTtl, refreshTokenTtl } = config;

export const validPassword = (password: string) => {
  // Create a schema
  var schema = new passwordValidator();

  // Add properties to it
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(16) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is();

  return schema.validate(password);
};

export const hashPassword = async (
  password: string,
  saltRounds: number
): Promise<string> => {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

export const generateAccessToken = (user: User) => {
  const token = jwt.sign(user, secret, { expiresIn: accessTokenTtl });
  return token;
};

export const generateRefreshToken = (user: User) => {
  const refreshToken = jwt.sign(user, secret, {
    expiresIn: refreshTokenTtl,
  });
  return refreshToken;
};

export const createUser = async (
  user: User,
  db: any
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const { username, password } = user;
  const hashedPassword = await hashPassword(password, saltRounds);
  user.password = hashedPassword;

  const result = await db.user.getByUserName(username);

  if (result?._id) throw new APIError("user already exists", "u-3");

  const createdUser = await db.user.create(user);
  delete createdUser.password;
  delete createdUser.__v;

  // generate the tokens
  const accessToken = generateAccessToken(createdUser);
  const refreshToken = generateRefreshToken(createdUser);

  return {
    accessToken,
    refreshToken,
  };
};
