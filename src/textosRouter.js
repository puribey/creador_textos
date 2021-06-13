import express from "express";
import upload from "./middlewares/fileUpload.js";
import { verifyToken } from "./middlewares/jwt.js";
import crearTextoFactory from "./crearTextoFactory.js";

function crearRouterTextos() {
  const textosRouter = express.Router();

  textosRouter.post("/", verifyToken, upload, async (req, res, next) => {
    req.body.userId = req.userId;
    req.body.tienePdf = req.body.tienePdf === "true"; // convert string to actual boolean

    if (req.file) {
      req.body.file = req.file;
      req.body.urlPdf = `${process.env.DEV_HOST}/${req.file.originalname}`;
      req.body.tempFilePath = req.file.path;
    }
    const textoFactory = crearTextoFactory();
    const texto = await textoFactory.crearTexto(req.body);
    res.status(201).json(texto);
  });

  textosRouter.use((error, req, res, next) => {
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

  return textosRouter;
}

export default crearRouterTextos;
