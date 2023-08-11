import Livro from "../models/Livro.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const listaDeLivros = await Livro.find({});
      res.status(200).json(listaDeLivros);
    } catch (err) {
      next(err);
    }
  };

  static listarLivroPorID = async (req, res, next) => {
    const { id } = req.params;

    try {
      const livro = await Livro.findById(id);

      if (livro) {
        res.status(200).json(livro);
      } else {
        res.status(404).json({ message: "Livro não encontrado." });
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      const livro = new Livro(req.body);
      await livro.save();
      res.status(201).json({ message: "Livro cadastrado com sucesso" });
    } catch (err) {
      next(err);
    }
  };

  static atualizarLivro = async (req, res,next) => {
    const { id } = req.params;

    try {
      const livroAtualizado = await Livro.findByIdAndUpdate(id, { $set: req.body });

      if (!livroAtualizado) {
        res.status(404).json({ message: "Ops! Livro não encontrado" });
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
      const livroExcluido = await Livro.findByIdAndDelete(id);

      if (!livroExcluido) {
        res.status(404).json({ message: "Ops! Livro não encontrado." });
      } else {
        res.status(201).json({ message: "Livro excluído com sucesso!" });
      }
    } catch (err) {
      next(err);
    }
  };
}

export default LivroController;
