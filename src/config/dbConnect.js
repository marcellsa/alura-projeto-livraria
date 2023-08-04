import 'dotenv/config';
import mongoose from "mongoose";

const username = process.env.DB_USER
const password = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://${username}:${password}@myfirstcluster.eff6uhg.mongodb.net/alura-node-express`);

let db = mongoose.connection;

export default db;