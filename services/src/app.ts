/** Configuring the dotenv before initializing any package */
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import compression from "compression";
import { initLogger } from "./utils/logger";
import { userRouterFactory } from "./users/users.router";

export default function (db: any, logLevel?: string) {
  const logger = initLogger(logLevel || (process.env.LOG_LEVEL as string));
  const app = express();
  const { PORT: port } = process.env;

  // compress all api responses
  app.use(compression());

  // #FIXME: allow only frontend domain after hosting
  app.use(cors());

  // parse incoming request json body
  app.use(express.json());

  app.listen(port, () => {
    logger.info(`server started 🚀 on port ${port}`);
  });

  app.use("/users", userRouterFactory(db));
  return app;
}
