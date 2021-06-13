import { crearTexto } from "./texto.js";
import { crearErrorUsuarioInvalido } from "./errores/ErrorUsuarioInvalido.js";
import { crearErrorTextoRepetido } from "./errores/ErrorTextoRepetido.js";
import fs from "fs";

function crearTextoCU(daoUsuarios, daoTextos, datoArchivos) {
  return {
    crearTexto: async (datosTexto) => {
      const tempFilePath = datosTexto.tempFilePath;
      try {
        const usuario = await daoUsuarios.getById(datosTexto.userId);
        if (!usuario) {
          throw crearErrorUsuarioInvalido("Usuario no identificado");
        }
        let nuevoTexto = crearTexto(datosTexto);
        const urlArchivo = await datoArchivos.guardar(datosTexto.file);
        nuevoTexto = { ...nuevoTexto, urlPdf: urlArchivo };
        const textoCreado = await daoTextos.addUnique(nuevoTexto);
        if (!textoCreado) {
          throw crearErrorTextoRepetido(
            "El texto que desea agregar ya existe con ese titulo"
          );
        }
        return nuevoTexto;
      } finally {
        fs.unlinkSync(tempFilePath);
      }
    },
  };
}

export { crearTextoCU };
