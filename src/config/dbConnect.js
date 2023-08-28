// Isso permite que o Dotenv faça as suas configurações de variáveis de ambiente
import "dotenv/config";
import mongoose from "mongoose";

// Conexão com o banco de dados
const DBUSER = process.env.DB_USER;
const DBPASSWORD = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://${DBUSER}:${DBPASSWORD}@myfirstcluster.eff6uhg.mongodb.net/alura-node-express`);

const db = mongoose.connection;

export default db;
