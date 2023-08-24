import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import app from "../../app.js";

describe("Testando app", () => {

  test("Deve retornar a rota principal", async() => {
    const res = await request(app).get("/");

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });
});