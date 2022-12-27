import { Router, Request, Response } from "express";
import { createUser, validPassword } from "./users";

export const userRouter = Router();

export type User = {
  username: string;
  password: string;
  email?: string;
};

userRouter.post("/signup", async (req: Request, res: Response) => {
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

  if (!password) {
    return res.status(200).send({
      status: "error",
      data: {
        message: "missing mandatory field password",
      },
    });
  }

  // validate password
  if (!validPassword(password)) {
    return res.status(200).send({
      status: "error",
      message: "password does not satisfy the required conditions",
    });
  }

  const response = await createUser(user);
  return res.status(200).send({
    status: "success",
    message: response,
  });
});
