import { describe, expect, it } from "vitest";
import { User } from "./users.router";
import { jest } from "@jest/globals";

const createUser = jest.fn(function (user, db) {
  return {
    accessToken: "",
    refreshToken: "",
  };
});

const db = {
  createUser,
};

describe("create user", () => {
  createUser.mockReset();
  it("should return tokens when creating an user", async () => {
    const user: User = {
      username: "arooon",
      password: "Football@123",
      email: "arun@bmail.com",
    };
    const tokens = await createUser(user, db);
    expect(tokens).keys(["accessToken", "refreshToken"]);
    expect(tokens.accessToken).lengthOf.greaterThan(0);
    expect(tokens.refreshToken).lengthOf.greaterThan(0);
  });
});
