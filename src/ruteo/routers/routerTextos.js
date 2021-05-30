import express from "express";
import upload from "../../middleware/fileUpload.js";

function crearRouterTextos(apiTextos) {
  const routerTextos = express.Router();

  routerTextos.post("/", upload, async (req, res, next) => {
    // TODO check for user permissions with token
    req.body.tienePdf = req.body.tienePdf === "true";
    if (req.file) {
      req.body.urlPdf = `http://localhost:8080/${req.file.originalname}`;
    }

    try {
      const texto = await apiTextos.addNew(req.body);
      res.status(201).json(texto);
    } catch (error) {
      next(error);
    }
  });

  routerTextos.use((error, req, res, next) => {
    if (error.type === "ERROR_DNI_EN_USO") {
      res.status(400);
    } else if (error.type === "ERROR_DATOS_INVALIDOS") {
      res.status(400);
    } else if (error.type === "ERROR_USUARIO_INVALIDO") {
      res.status(403);
    } else if (error.type === "ERROR_TEXTO_NO_ENCONTRADO") {
      res.status(404);
    } else {
      res.status(500);
    }
    console.log("Error:", error.message);
    res.json({ message: error.message });
  });

  return routerTextos;
}

export { crearRouterTextos };
