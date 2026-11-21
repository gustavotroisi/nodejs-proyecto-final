import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import productsRouter from "./src/routes/products.routes.js";
import authRouter from './src/routes/auth.routes.js';

const app = express();
const PORT = 3000;

app.use(cors({
    origin: "*"
}));
app.use(bodyParser.json());

app.use("/api", productsRouter);
app.use('/auth', authRouter);

app.use((req, res) => {
   res.status(404).json({
        error: "Ruta no encontrada",
        mensaje: `El recurso no existe o la petición es incorrecta.`
    })
});

app.listen(PORT, () => console.log(`Servidor iniciado en http://localhost:${PORT}`));
