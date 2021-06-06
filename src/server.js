import express from "express";
import upload from "./middlewares/fileUpload.js";
import { verifyToken } from "./middlewares/jwt.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function crearServidor({ aplicacion, port = 0 }) {
  const app = express();

  app.use(express.json());
  app.use(express.static(path.join(__dirname, "uploads")));

  app.post("/api/textos", verifyToken, upload, async (req, res, next) => {
    req.body.decodedUserId = req.userId;
    req.body.tienePdf = req.body.tienePdf === "true"; // convert string to actual boolean

    if (req.file) {
      req.body.urlPdf = `http://localhost:8080/${req.file.originalname}`;
      req.body.pathToUpload = req.file.path;
    }

    const texto = await aplicacion.addNew(req.body);
    res.status(201).json(texto);
  });

  app.use((error, req, res, next) => {
    if (error.code == "LIMIT_FILE_SIZE") {
      res.status(400);
    } else if (error.type === "ERROR_USUARIO_INVALIDO") {
      res.status(403);
    } else if (error.type === "ERROR_USUARIO_INVALIDO") {
      res.status(403);
    } else {
      res.status(500);
    }
    res.json({ message: error.message });
  });
  return new Promise((resolve, reject) => {
    const server = app
      .listen(port)
      .once("error", () => {
        reject(new Error("error al conectarse al servidor"));
      })
      .once("listening", () => {
        server.port = server.address().port;
        console.log(`Listening on http://localhost:${server.port}/`);
        resolve(server);
      });
  });
}

export { crearServidor };
