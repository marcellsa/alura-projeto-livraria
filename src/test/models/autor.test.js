import { describe, expect, test } from "@jest/globals";
import { autores } from "../../models/index.js";

describe("Testano o modelo Autor", () => {
  const objetoAutor = {
    nome: "Brené Brown",
    nacionalidade: "estadunidense"
  };

  test("Deve instanciar um novo autor", () => {
    const autor = new autores(objetoAutor);

    expect(autor).toEqual(
      expect.objectContaining(objetoAutor)
    );
  });
});