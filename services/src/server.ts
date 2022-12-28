import createServer from "./app";
import user from "../src/users/users.data";
import { connect } from "./utils/dbconfig";
import config from "./config";
import { initLogger } from "./utils/logger";

function init(logLevel: string) {
  initLogger(logLevel || (process.env.LOG_LEVEL as string));
  const { mongoUserName, mongoPassword } = config;
  const mongoUri = `mongodb+srv://${mongoUserName}:${mongoPassword}@cluster0.2xmch.mongodb.net/simpldo?retryWrites=true&w=majority`;
  connect(mongoUri, {});
  createServer(5500, { user });
}

init("debug");
