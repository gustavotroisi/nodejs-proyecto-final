import express from "express";
import cors from "cors";
import productsRouter from "./src/routes/products.routes.js";

const app = express();
const PORT = 3000;

app.use(cors());

app.use("/api", productsRouter);

app.use((req, res) => {
  res.status(400).send("Recurso no encontrado");
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
