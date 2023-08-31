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

describe("GET em /livros", () => {
  
  test("Deve retornar uma lista de livros", async () => {
    await request(app)
      .get("/livros")
      .set("Accept", "application")
      .expect("content-type", /json/)
      .expect(200);
  });

  test("O primeiro título da lista de livros, deve ser 'A coragem de ser imperfeito'", async () => {
    const result = await request(app)
      .get("/livros")
      .set("Accept", "application")
      .expect("content-type", /json/)
      .expect(200);

    expect(result.body[0].titulo).toEqual("A coragem de ser imperfeito");
  });
});