import { describe, expect, test } from "@jest/globals";
import { editoras } from "../../models/index.js";

describe("Testano o modelo Editora", () => {
  const objetoEditora = {
    nome: "Globo Livros",
    fundacao: "1998"
  };

  test("Deve instanciar uma nova editora", () => {
    const editora = new editoras(objetoEditora);

    expect(editora).toEqual(
      expect.objectContaining(objetoEditora)
    );
  });
});