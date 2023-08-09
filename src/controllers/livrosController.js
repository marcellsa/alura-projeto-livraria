import livros from '../models/Livro.js';

class LivroController {
  static listarLivros = async (req, res) => {
    try {
      const listaDeLivros = await livros.find({});
      res.status(200).json(listaDeLivros);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default LivroController;
