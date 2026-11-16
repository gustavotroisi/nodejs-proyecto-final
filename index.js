import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import productsRouter from "./src/routes/products.routes.js";
import authRouter from './src/routes/auth.routes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", productsRouter);

app.use('/auth', authRouter);

app.use((req, res) => {
  res.status(400).send("Recurso no encontrado");
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
