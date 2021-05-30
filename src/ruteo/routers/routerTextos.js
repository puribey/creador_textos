import express from "express";
import { fileUpload } from "../../middleware/fileUpload.js";

function crearRouterTextos(apiTextos) {
  const routerTextos = express.Router();

  routerTextos.get("/", async (req, res, next) => {
    try {
      let textos;
      if (req.query.idUsuario) {
        textos = await apiTextos.getAllByUser(req.query.idUsuario);
      } else if (req.query.idTexto) {
        textos = await apiTextos.getAllById(req.query.idTexto);
      } else {
        textos = await apiTextos.getAll();
      }
      res.json(textos);
    } catch (error) {
      next(error);
    }
  });

  routerTextos.post("/", fileUpload, async (err, req, res, next) => {
    // TODO check for user permissions with token
    if (req.pdfName) {
      console.log("req.pdfName", req.pdfName);
      req.body.urlPdf = "";
    }
    try {
      const texto = await apiTextos.addNew(req.body);
      res.status(201).json(texto);
    } catch (error) {
      next(error);
    }
  });

  routerTextos.delete("/:id", async (req, res, next) => {
    // TODO check for user permissions with token
    try {
      await apiTextos.deleteById(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });

  routerTextos.put("/:id", async (req, res, next) => {
    // TODO check for user permissions with token
    try {
      const texto = await apiTextos.updateById(req.body, req.params.id);
      res.json(texto);
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
