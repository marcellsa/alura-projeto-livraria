import NaoEncontrado from "../erros/NaoEncontrado.js";
import { livros, autores, editoras } from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const listaDeLivros = await livros.find({})
        .populate("autor")
        .populate("editora")
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
        .populate("editora", "nome")
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

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const listaDeLivros = await livros
          .find(busca)
          .populate("autor")
          .populate("editora")
          .exec();

        res.status(200).send(listaDeLivros);
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(parametros) {
  const { titulo, minPaginas, maxPaginas, nomeAutor, nomeEditora } = parametros;

  let busca = {};

  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  // gte = Greater Than or Equal = Maior ou igual que
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  // lte = Less Than or Equal = Menor ou igual que
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }

  if (nomeEditora) {
    const editora = await editoras.findOne({ nome: nomeEditora });

    if (editora !== null) {
      busca.editora = editora._id;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;
