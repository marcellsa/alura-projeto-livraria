import Livro from '../models/Livro.js';

class LivroController {
  static listarLivros = async (req, res) => {
    try {
      const listaDeLivros = await Livro.find({});
      res.status(200).json(listaDeLivros);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  static cadastrarLivro = async (req, res) => {
    try {
      const livro = new Livro(req.body);
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default LivroController;
