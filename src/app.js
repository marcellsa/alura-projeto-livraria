import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorsMiddleware from "./middlewares/errorsMiddleware.js";
import manipulador404 from "./middlewares/manipulador404.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com o banco estabelecida com sucesso");
});

const app = express();
app.use(express.json());
routes(app);

app.use(manipulador404);

app.use(errorsMiddleware);

export default app;
