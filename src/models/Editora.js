import mongoose from "mongoose";

const editoraSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "A editora é obrigatória"],
      enum: {
        values: ["Novatec", "Sextante", "Globo Livros", "Cengage", "Atlas Books"],
        message: "A editora {VALUE} não é um valor permitido."
      }
    },
    fundacao: { type: String}
  },
  {
    versionKey: false
  }
);

const editoras = mongoose.model("editoras", editoraSchema);

export default editoras;