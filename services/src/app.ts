/** Configuring the dotenv before initializing any package */
import dotenv from "dotenv";
import createError, { HttpError } from "http-errors";

dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import compression from "compression";
import { initLogger } from "./utils/logger";
import { userRouterFactory } from "./users/users.router";
import { APIError } from "../../lib/errors";

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

  app.use("*", () => {
    createError(404, "Page Not Found");
  });

  app.use(
    (
      err: APIError | Error | HttpError<number>,
      req: Request,
      res: Response,
      next: any
    ) => {
      if (!err) next();

      // log the error message
      logger.error(err);

      // decide the http status code and error code based on error type
      let statusCode = 400;
      let errorCode = "400";
      if (err instanceof HttpError) {
        statusCode = err.statusCode;
        errorCode = err.statusCode.toString();
      } else if (err instanceof APIError) {
        statusCode = 200;
        errorCode = err.apiErrorCode;
      }

      // send the error response
      res.status(statusCode).json({
        status: "error",
        code: errorCode,
        message: err.message,
      });
    }
  );

  return app;
}
