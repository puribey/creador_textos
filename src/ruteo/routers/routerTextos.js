import express from "express";
import fileUpload from "../../middleware/fileUpload.js";

function crearRouterTextos(apiTextos) {
  const routerTextos = express.Router();

  routerTextos.post("/", fileUpload, async (req, res, next) => {
    // TODO check for user permissions with token
    console.log("req", req.body);
    if (req.pdfName) {
      req.body.urlPdf = "";
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
    res.json({ message: error.message });
  });

  return routerTextos;
}

export { crearRouterTextos };
