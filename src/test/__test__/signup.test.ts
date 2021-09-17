import * as faker from "faker";
import request from "supertest";
import { app } from "../../app";

beforeAll(async () => {});

it("returns a 201 on successful signup", async () => {
  const randomString = faker.random.alphaNumeric(10);
  const email = `user-${randomString}@email.com`;
  const phone = `08169982643`;

  const res = await request(app).post("/auth/signup").send({
    first_name: "Nelson",
    last_name: "Nedum",
    phone,
    email,
  });
  expect(res.body).toHaveProperty("data");
  expect(res.body.data).toHaveProperty("user");
  expect(res.body.data).toHaveProperty("tokens");
  expect(res.statusCode).toEqual(201);
});

it("should fail when signup with invalid/incomplete details", async () => {
  const response = await request(app)
    .post("/auth/signup")
    .send({
      first_name: "Nelly",
      password: "123",
    })
    .expect(400);

  expect(response.body).toMatchObject({
    success: false,
  });
});
