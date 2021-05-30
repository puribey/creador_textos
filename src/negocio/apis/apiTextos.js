import { crearErrorIdTextoRepetido } from "../errores/ErrorIdTextoRepetido.js";
import { crearErrorTextoNoEncontrado } from "../errores/ErrorTextoNoEncontrado.js";

import { crearTexto } from "../modelos/Texto.js";

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
  };
}

export { crearApiTextos };
