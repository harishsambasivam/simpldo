import request from "supertest";
import app from "../app";
import { describe, it, expect, vi } from "vitest";

// application users
const users: any = {
  arun: {
    username: "arun",
    email: "arooon@bmail.com",
    _id: "63ac34769e3cf10a54c3d851",
    createdAt: "2022-12-28T12:20:06.614Z",
    updatedAt: "2022-12-28T12:20:06.614Z",
  },
};

// mock function for user model
const db = {
  user: {
    createOne: vi.fn(() => ({
      username: "arooon",
      email: "arooon@bmail.com",
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

const server = app(4500, db, "silent");

describe("create users /users", () => {
  it("should create an user", async () => {
    const payload = {
      username: "arooon",
      password: "Football@123",
      email: "arun@bmail.com",
    };

    const { body: response } = await request(server)
      .post("/users")
      .send(payload)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.status).toEqual("success");
    expect(response.body.accessToken).lengthOf.greaterThan(0);
    expect(response.body.refreshToken).lengthOf.greaterThan(0);
  });

  it("should throw missing username error", async () => {
    const payload = {
      password: "Foootbal@123",
      email: "arun@bmail.com",
    };
    const { body } = await request(server)
      .post("/users")
      .send(payload)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(body.status).toEqual("error");
  });

  it("should throw missing password error", async () => {
    const payload = {
      email: "arun@bmail.com",
      username: "arun",
    };
    const { body } = await request(server)
      .post("/users")
      .send(payload)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(body.status).toEqual("error");
  });

  it("should throw invalid password error", async () => {
    const payload = {
      username: "arooon",
      password: "foot",
      email: "arun@bmail.com",
    };
    const { body } = await request(server)
      .post("/users")
      .send(payload)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(body.status).toEqual("error");
  });

  it("should throw error on duplicate username", async () => {});

  it("should create user even without email", async () => {
    const payload = {
      username: "arooon",
      password: "Football@321",
    };
    const { body: response } = await request(server)
      .post("/users")
      .send(payload)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(response.status).toEqual("success");
    expect(response.body.accessToken).lengthOf.greaterThan(0);
    expect(response.body.refreshToken).lengthOf.greaterThan(0);
  });
});

describe("update users PUT /users", () => {
  it("should update the user with new data", async () => {
    await request(server).put("/users").expect(200);
  });
});
//   it("should allow user to login: /users/login", async () => {
//     await request(app).post("/users/login").expect(200);
//   });

//   it("should refresh the token", async () => {
//     await request(app).post("/users/logout").expect(200);
//   });

//   it("should logout an user: /users/logout", async () => {
//     await request(app).post("/users/logout").expect(200);
//   });
