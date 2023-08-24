import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import app from "../../app.js";

describe("Testando o servidor", () => {

  test("Deve responder à rota raiz", async() => {
    const response = await request(app).get("/");

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("message");
  });
});