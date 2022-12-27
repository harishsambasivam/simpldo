import dotenv from "dotenv";
dotenv.config();

const config = {
  secret: process.env.JWT_SECRET as string,
  port: process.env.PORT as string,
  logLevel: process.env.LOG_LEVEL as string,
  environment: process.env.NODE_ENV as string,
  saltRounds: 10,
  refreshTokenTtl: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15, // 30 days
  accessTokenTtl: Math.floor(Date.now() / 1000) + 60 * 60 * 1, // 1 hour
};

export default config;
