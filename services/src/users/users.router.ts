import { Router, Request, Response } from "express";
import { createUser, validPassword } from "./users.service";
import { APIError } from "../../../lib/errors";

export type User = {
  username: string;
  password: string;
  email?: string;
};

export function userRouterFactory(db: any) {
  const userRouter = Router();
  userRouter.post("/signup", async (req: Request, res: Response, next: any) => {
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
          data: {
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

      const response = await createUser(user, db);
      return res.status(200).send({
        status: "success",
        message: response,
      });
    } catch (err) {
      next(err);
    }
  });

  return userRouter;
}
