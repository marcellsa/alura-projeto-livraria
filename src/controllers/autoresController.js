import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const listaDeAutores = autores.find({});
      req.resultado = listaDeAutores;
      next();
    } catch (err) {
      next(err);
    }
  };

  static listarAutorPorID = async (req, res, next) => {
    const { id } = req.params;

    try {
      const autor = await autores.findById(id);

      if (autor) {
        res.status(200).send(autor);
      } else {
        next(new NaoEncontrado("Ops! Id do(a) Autor(a) não localizado."));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      const autor = new autores(req.body);
      await autor.save();
      res.status(201).json({ message: "Autor(a) cadastrado com sucesso" });
    } catch (err) {
      next(err);
    }
  };

  static atualizarAutor = async (req, res,next) => {
    const { id } = req.params;

    try {
      const autorAtualizado = await autores.findByIdAndUpdate(id, { $set: req.body });

      if (!autorAtualizado) {
        next(new NaoEncontrado("Ops! Id do(a) Autor(a) não localizado."));
      } else {
        res.status(201).json({ message: "Autor(a) atualizado!" });
      }
    } catch (err) {
      next(err);
    }
  };

  static excluirAutor = async (req, res, next) => {
    const { id } = req.params;

    try {
      const autorExcluido = await autores.findByIdAndDelete(id);

      if (!autorExcluido) {
        next(new NaoEncontrado("Ops! Id do(a) Autor(a) não localizado."));
      } else {
        res.status(201).send({ message: "Autor(a) excluído com sucesso!" });
      }
    } catch (err) {
      next(err);
    }
  };
}

export default AutorController;
