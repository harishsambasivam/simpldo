import { describe, expect, it, vi } from "vitest";
import { createUser } from "./users.service";
import { User } from "../../../lib/types";

const users: any = {
  user2: {
    username: "user2",
    email: "user1@bmail.com",
    _id: "63ac34769e3cf10a54c3d851",
    createdAt: "2022-12-28T12:20:06.614Z",
    updatedAt: "2022-12-28T12:20:06.614Z",
  },
};

const db = {
  user: {
    createOne: vi.fn(() => ({
      username: "user2",
      email: "user1@bmail.com",
      _id: "63ac34769e3cf10a54c3d851",
      createdAt: "2022-12-28T12:20:06.614Z",
      updatedAt: "2022-12-28T12:20:06.614Z",
    })),
    getByUserName: vi.fn((username) => users[username]),
    updateOne: vi.fn((username: string, data: any) => ({
      ...data,
    })),
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
    const tokens = await createUser(db, user);
    expect(tokens).keys(["accessToken", "refreshToken"]);
    expect(tokens.accessToken).lengthOf.greaterThan(0);
    expect(tokens.refreshToken).lengthOf.greaterThan(0);
    // expect(mockCreateUser.mock.calls.length).toBe(1);
  });
});
