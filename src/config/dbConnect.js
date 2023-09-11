// Isso permite que o Dotenv configure as variáveis de ambiente
import "dotenv/config";
import mongoose from "mongoose";

// Conexão com o banco de dados
const { DB_USER, DB_PASSWORD } = process.env;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@myfirstcluster.eff6uhg.mongodb.net/alura-node-express`);

const db = mongoose.connection;

export default db;
