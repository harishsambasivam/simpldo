// @ts-ignore
import passwordValidator from "password-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";
import { User } from "./users.router";

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
  const { password } = user;
  const hashedPassword = await hashPassword(password, saltRounds);
  user.password = hashedPassword;

  // #TODO: store the user details in database
  db.createUser();

  // generate the tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
  };
};
