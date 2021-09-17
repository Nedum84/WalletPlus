import request from "supertest";
import { app } from "../../app";
import * as faker from "faker";

describe("test send money", () => {
  it("should succeed when I send money to a registered user", async () => {
    const { tokens } = await global.signin();
    //Sencond user registration
    const randomString = faker.random.alphaNumeric(10);
    const email = `user-${randomString}@email.com`;
    const phone = `08169682642`;

    const res = await request(app).post("/auth/signup").send({
      first_name: "Nelson",
      last_name: "Ned",
      phone,
      email,
    });
    expect(typeof res.body).toBe("object");
    expect(res.statusCode).toEqual(201);

    //Load money
    await request(app)
      .post("/addmoney")
      .set("authorization", `bearer ${tokens?.access?.token}`)
      .send({
        amount: 12000,
      })
      .expect(200);
    //-->Send money
    const response = await request(app)
      .post("/sendmoney")
      .set("authorization", `bearer ${tokens?.access?.token}`)
      .send({
        amount: 1200,
        to: res.body.data.user.user_id,
      });

    expect(response.body.data).toHaveProperty("transfer");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject({
      success: true,
    });
  });

  it("should fail for incomplete params", async () => {
    const { tokens } = await global.signin();

    const response = await request(app)
      .post("/sendmoney")
      .set("authorization", `bearer ${tokens?.access?.token}`)
      .send({
        amount: 12000,
      });

    expect(response.body).toMatchObject({
      success: false,
    });
    expect(response.statusCode).toEqual(400);
  });

  it("should fail for insufficient balance", async () => {
    const { tokens } = await global.signin();

    //reg user
    const res = await request(app).post("/auth/signup").send({
      first_name: "Nelson",
      last_name: "Ned",
      phone: "08098987868",
      email: "edumodo4@gmail.com",
    });
    expect(typeof res.body).toBe("object");
    expect(res.statusCode).toEqual(201);

    //send cash
    const response = await request(app)
      .post("/sendmoney")
      .set("authorization", `bearer ${tokens?.access?.token}`)
      .send({
        amount: 12000000,
        to: res.body.data.user.user_id,
      });

    expect(response.body).toMatchObject({
      success: false,
    });
    expect(response.statusCode).toEqual(400);
  });
});
