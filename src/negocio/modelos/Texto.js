import { crearErrorDatosInvalidos } from "../errores/ErrorDatosInvalidos.js";
import { isEmpty } from "../../utils/index.js";

/**
 * TEXTO
 * idTexto: int
 * idUsuario: string
 * titulo: string
 * genero: enum('ficcion', 'no_ficcion', 'poesia')
 * tienePdf: boolean
 * urlPdf: string
 * contenido: string
 */

let nextId = 1;

function crearTexto(datos, idTexto = null) {
  const generosPermitidos = ["ficcion", "no_ficcion", "poesia"];
  const texto = {};

  // TODO
  if (!datos.idUsuario) {
    throw crearErrorDatosInvalidos("usuario invalido");
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

  if (tienePdf && !isEmpty(urlPdf)) {
    throw crearErrorDatosInvalidos("pdf no adjuntado");
  } else {
    texto.tienePdf = datos.tienePdf;
    texto.urlPdf = datos.urlPdf;
    texto.contenido = null;
  }

  if (!tienePdf && !isEmpty(contenido)) {
    throw crearErrorDatosInvalidos("este texto no tiene contenido");
  } else {
    texto.tienePdf = datos.tienePdf;
    texto.contenido = datos.contenido;
    texto.urlPdf = null;
  }

  if (idTexto) {
    texto.idTexto = Number(idTexto);
  } else if (!isNaN(Number(datos.idTexto))) {
    texto.idTexto = Number(datos.idTexto);
  } else {
    texto.idTexto = nextId++;
  }

  return texto;
}

export { crearTexto };
