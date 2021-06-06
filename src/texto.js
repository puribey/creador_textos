import { crearErrorDatosInvalidos } from "./errores/ErrorDatosInvalidos.js";
import { crearErrorUsuarioInvalido } from "./errores/ErrorUsuarioInvalido.js";
import { isEmpty } from "./utils/index.js";
import fs from "fs";

/**
 * TEXTO
 * idTexto: int
 * idUsuario: string
 * titulo: string
 * genero: enum('ficcion', 'no_ficcion', 'poesia')
 * tienePdf: boolean
 * urlPdf?: string
 * contenido?: string
 */

let nextId = 1;

function crearTexto(datos, idTexto = null) {
  const generosPermitidos = ["ficcion", "no_ficcion", "poesia"];
  const texto = {};

  if (datos.idUsuario !== datos.decodedUserId) {
    if (datos.pathToUpload) {
      fs.unlinkSync(datos.pathToUpload);
    }
    throw crearErrorUsuarioInvalido("Usuario no identificado");
  } else {
    texto.idUsuario = datos.idUsuario;
  }

  if (!datos.titulo) {
    throw crearErrorDatosInvalidos("falta el titulo");
  } else {
    texto.titulo = datos.titulo;
  }

  if (!generosPermitidos.includes(datos.genero)) {
    throw crearErrorDatosInvalidos("el genero que intenta crear no existe");
  } else {
    texto.genero = datos.genero;
  }

  if (datos.tienePdf && isEmpty(datos.urlPdf)) {
    throw crearErrorDatosInvalidos("pdf no adjuntado");
  }

  if (!datos.tienePdf && isEmpty(datos.contenido)) {
    throw crearErrorDatosInvalidos("este texto no tiene contenido");
  }

  if (!datos.tienePdf && !isEmpty(datos.urlPdf)) {
    if (datos.pathToUpload) {
      fs.unlinkSync(datos.pathToUpload);
    }
    throw crearErrorDatosInvalidos(
      "el texto que se intenta crear no deberia contener archivos adjuntos"
    );
  }

  if (idTexto) {
    texto.idTexto = Number(idTexto);
  } else if (!isNaN(Number(datos.idTexto))) {
    texto.idTexto = Number(datos.idTexto);
  } else {
    texto.idTexto = nextId++;
  }

  texto.tienePdf = datos.tienePdf;
  texto.contenido = datos.contenido || null;
  texto.urlPdf = datos.urlPdf || null;

  return texto;
}

export { crearTexto };
