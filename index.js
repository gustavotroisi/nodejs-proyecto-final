import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

app.use((req, res, next) => {
  console.log(`Recibido ${req.method}`);
  next();
});

app.get("/json", (req, res) => {
  res.json({
    data: [
      { id: 1, name: "Juan" },
      { id: 2, name: "Luis" },
      { id: 3, name: "Pedro" },
    ],
    message: "Usuarios enviados",
  });
});

app.get("/html", (req, res) => {
  res.send(`<h1>Este es el titulo</h1>`);
});

app.get("/", (req, res) => {
  res.status(200, res.send("Lea la documentación en http://..."));
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en localhost:${PORT}`);
});
