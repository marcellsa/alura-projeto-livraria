import livros from "../models/Livro.js";

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
      const livro = await livros.findById(id);

      if (livro) {
        res.status(200).send(livro);
      } else {
        res.status(404).send({ message: "Livro não encontrado." });
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
      const livroExcluido = await livros.findByIdAndDelete(id);

      if (!livroExcluido) {
        res.status(404).send({ message: "Ops! Livro não encontrado." });
      } else {
        res.status(201).send({ message: "Livro excluído com sucesso!" });
      }
    } catch (err) {
      next(err);
    }
  };
}

export default LivroController;
