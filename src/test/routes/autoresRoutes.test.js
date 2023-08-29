import app from "../../app.js";
import request from "supertest";
import { describe, test, expect, beforeEach, afterEach } from "@jest/globals";

let server;
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe("GET em /autores", () => {
  
  test("Deve retornar uma lista de autores", async () => {
    await request(app)
      .get("/autores")
      .set("Accept", "application")
      .expect("content-type", /json/)
      .expect(200);
  });

  test("O primeiro nome da lista de autores, deve ser Brené Brown", async () => {
    const result = await request(app)
      .get("/autores")
      .set("Accept", "application")
      .expect("content-type", /json/)
      .expect(200);

    expect(result.body[0].nome).toEqual("Brené Brown");
  });
});