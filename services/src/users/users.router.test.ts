import request from "supertest";
import app from "../app";
import { describe, it, expect } from "vitest";

const db = {
  user: {
    create: () => {},
    update: () => {},
  },
};

const server = app(db, "silent");

describe("create users /users/signup", () => {
  it("should create an user", async () => {
    const payload = {
      username: "arooon",
      password: "Football@123",
      email: "arun@bmail.com",
    };

    const { body } = await request(server)
      .post("/users/signup")
      .send(payload)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(body.status).toEqual("success");
    expect(body.message.accessToken).lengthOf.greaterThan(0);
    expect(body.message.refreshToken).lengthOf.greaterThan(0);
  });

  it("should throw missing username error", async () => {
    const payload = {
      password: "Foootbal@123",
      email: "arun@bmail.com",
    };
    const { body } = await request(server)
      .post("/users/signup")
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
      .post("/users/signup")
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
      .post("/users/signup")
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
    const { body } = await request(server)
      .post("/users/signup")
      .send(payload)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(body.status).toEqual("success");
    expect(body.message.accessToken).lengthOf.greaterThan(0);
    expect(body.message.refreshToken).lengthOf.greaterThan(0);
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
