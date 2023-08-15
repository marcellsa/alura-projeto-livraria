import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const listaDeAutores = await autores.find({});
      res.status(200).send(listaDeAutores);
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
        res.status(404).send({ message: "Autor(a) não encontrado." });
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
        res.status(404).json({ message: "Ops! Autor(a) não encontrado" });
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
        res.status(404).send({ message: "Ops! Autor(a) não encontrado." });
      } else {
        res.status(201).send({ message: "Autor(a) excluído com sucesso!" });
      }
    } catch (err) {
      next(err);
    }
  };
}

export default AutorController;
