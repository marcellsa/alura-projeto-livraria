import app from "../../app.js";
import request from "supertest";
import { describe, test, expect, beforeEach, afterEach } from "@jest/globals";

let server;
beforeEach(() => {
  const port = 8080;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe("GET em /editoras", () => {
  
  test("Deve retornar uma lista de editoras", async () => {
    await request(app)
      .get("/editoras")
      .set("Accept", "application")
      .expect("content-type", /json/)
      .expect(200);
  });

  test("O primeiro nome da lista de editoras, deve ser Sextante", async () => {
    const result = await request(app)
      .get("/editoras")
      .set("Accept", "application")
      .expect("content-type", /json/)
      .expect(200);

    expect(result.body[1].nome).toEqual("Sextante");
  });
});