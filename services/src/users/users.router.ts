import { Router, Request, Response } from "express";
import { createUser, updateUser, validPassword } from "./users.service";
import { APIError } from "../../../lib/errors";
import { User } from "../../../lib/types";

export function userRouterFactory(db: any) {
  const userRouter = Router();
  userRouter.post("/", async (req: Request, res: Response, next: any) => {
    try {
      const { username, password, email }: User = req.body;
      const user: User = {
        username,
        password,
        email,
      };

      // mandatory fields check
      if (!username) {
        return res.status(200).send({
          status: "error",
          body: {
            message: "missing mandatory field username",
          },
        });
      }

      if (!password)
        throw new APIError("missing mandatory field password", "u-1");
      if (!validPassword(password))
        throw new APIError(
          "password does not satisfy the required conditions",
          "u-2"
        );

      const response = await createUser(db, user);
      return res.status(200).send({
        status: "success",
        body: response,
      });
    } catch (err) {
      next(err);
    }
  });

  userRouter.put("/", async (req, res, next) => {
    try {
      const { email }: User = req.body;
      const { username } = req.user;
      const user: any = {
        email,
      };
      const response = await updateUser(db, username, user);
      console.log(response);
      if (response) {
        res.status(200).json({
          status: "success",
          body: response,
        });
      }
    } catch (err) {
      next(err);
    }
  });

  return userRouter;
}
