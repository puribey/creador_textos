import { crearErrorDatosInvalidos } from "./errores/ErrorDatosInvalidos.js";
import { isEmpty, isValidURL } from "./utils/index.js";

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
  texto.idUsuario = datos.idUsuario;

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

  if (datos.tienePdf && !isValidURL(datos.urlPdf)) {
    throw crearErrorDatosInvalidos("la url del pdf no es válida");
  }

  if (!datos.tienePdf && isEmpty(datos.contenido)) {
    throw crearErrorDatosInvalidos("este texto no tiene contenido");
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
