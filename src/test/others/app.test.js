import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";

describe("Testando o servidor", () => {

  test("Deve responder à rota raiz", async() => {
    const response = await request(app).get("/");

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("message");

    await mongoose.connection.close();
  });
});