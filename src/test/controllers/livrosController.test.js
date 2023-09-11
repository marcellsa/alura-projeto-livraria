import axios from "axios";
import LivroController from "../../controllers/livrosController";
import { describe, test, expect } from "@jest/globals";

const request = (url, method, data) => {
  return axios({ url, method, data });
};

describe( "Testando LivroController", () => {

  test.only("Deve cadastrar uma novo livro", async () => {
    const data = ({
      titulo: "Estrutura de Dados", 
      autor: "64de2f00925fa8433ca6d681",
      editora: "64de74eefb16bf4c581bb8bd",
      numeroPaginas: 408,
    });
    
    const response = await request("http://localhost:8000/livros", "post", data);
    const newBook = response.data;
    expect(newBook.title).toBe(data.title);
    await LivroController.excluirLivro(data.id);
  });
});