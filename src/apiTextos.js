import { crearErrorIdTextoRepetido } from "./errores/ErrorIdTextoRepetido.js";

import { crearTexto } from "./texto.js";

function crearApiTextos({ daoTextos }) {
  return {
    addNew: async (datosTexto) => {
      const texto = crearTexto(datosTexto);
      const { added } = await daoTextos.addUnique(texto, "idTexto");
      if (!added) {
        throw crearErrorIdTextoRepetido("ya existe un texto con este id");
      }
      return texto;
    },
    getAllByUser: async (idUsuario) => {
      return await daoTextos.getAllByUser(idUsuario);
    },
  };
}

export { crearApiTextos };
