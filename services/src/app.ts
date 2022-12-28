/** Configuring the dotenv before initializing any package */
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import compression from "compression";
import { logger } from "./utils/logger";
import { userRouter } from "./users/users.router";

export default function (dbUri: string) {
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

  app.use("/users", userRouter);
  return app;
}
