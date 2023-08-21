import NaoEncontrado from "../erros/NaoEncontrado.js";
import { editoras } from "../models/index.js";

class EditoraController {

  static listarEditoras = async (req, res, next) => {
    try {
      const listaDeEditoras = editoras.find({});
      req.resultado = listaDeEditoras;
      next();
    } catch (err) {
      next(err);
    }
  };

  static listarEditoraPorID = async (req, res, next) => {
    const { id } = req.params;

    try {
      const editora = await editoras.findById(id);

      if (editora) {
        res.status(200).send(editora);
      } else {
        next(new NaoEncontrado("Ops! Id da Editora não localizado."));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarEditora = async (req, res, next) => {
    try {
      const editora = new editoras(req.body);
      await editora.save();
      res.status(201).json({ message: "Editora cadastrada com sucesso" });
    } catch (err) {
      next(err);
    }
  };

  static atualizarEditora = async (req, res,next) => {
    const { id } = req.params;

    try {
      const editoraAtualizada = await editoras.findByIdAndUpdate(id, { $set: req.body });

      if (!editoraAtualizada) {
        next(new NaoEncontrado("Ops! Id da Editora não localizado."));
      } else {
        res.status(201).json({ message: "Editora atualizada!" });
      }
    } catch (err) {
      next(err);
    }
  };

  static excluirEditora = async (req, res, next) => {
    const { id } = req.params;

    try {
      const editoraExcluida = await editoras.findByIdAndDelete(id);

      if (!editoraExcluida) {
        next(new NaoEncontrado("Ops! Id da Editora não localizado."));
      } else {
        res.status(201).send({ message: "Editora excluída com sucesso!" });
      }
    } catch (err) {
      next(err);
    }
  };
}

export default EditoraController;
