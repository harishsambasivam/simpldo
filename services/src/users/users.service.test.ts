import { describe, expect, it, vi } from "vitest";
import { User } from "./users.router";
import { createUser } from "./users.service";

const db = {
  user: {
    create: vi.fn(() => {}),
  },
};

describe("create user", () => {
  // mockCreateUser.mockReset();
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
    // expect(mockCreateUser.mock.calls.length).toBe(1);
  });
});
