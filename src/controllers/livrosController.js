import NaoEncontrado from "../erros/NaoEncontrado.js";
import { livros } from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const listaDeLivros = await livros.find({})
        .populate("autor")
        .exec();
      res.status(200).send(listaDeLivros);
    } catch (err) {
      next(err);
    }
  };

  static listarLivroPorID = async (req, res, next) => {
    const { id } = req.params;

    try {
      const livro = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livro) {
        res.status(200).send(livro);
      } else {
        next(new NaoEncontrado("Ops! Id do Livro não localizado."));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      const livro = new livros(req.body);
      await livro.save();
      res.status(201).json({ message: "Livro cadastrado com sucesso" });
    } catch (err) {
      next(err);
    }
  };

  static atualizarLivro = async (req, res,next) => {
    const { id } = req.params;

    try {
      const livroAtualizado = await livros.findByIdAndUpdate(id, { $set: req.body });

      if (!livroAtualizado) {
        next(new NaoEncontrado("Ops! Id do Livro não localizado."));
      } else {
        res.status(201).json({ message: "Livro atualizado!" });
      }
    } catch (err) {
      next(err);
    }
  };

  static excluirLivro = async (req, res, next) => {
    const { id } = req.params;

    try {
      const livroExcluido = await livros.findByIdAndDelete(id);

      if (!livroExcluido) {
        next(new NaoEncontrado("Ops! Id do Livro não localizado."));
      } else {
        res.status(201).send({ message: "Livro excluído com sucesso!" });
      }
    } catch (err) {
      next(err);
    }
  };
}

export default LivroController;
