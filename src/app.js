import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorsMiddleware from "./middlewares/errorsMiddleware.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com o banco estabelecida com sucesso");
});

const app = express();
app.use(express.json());
routes(app);

app.use(errorsMiddleware);

export default app;
