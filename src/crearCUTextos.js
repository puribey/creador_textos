import { crearErrorIdTextoRepetido } from "./errores/ErrorIdTextoRepetido.js";
import { crearTexto } from "./texto.js";

function crearCUTextos({ daoTextos }) {
  return {
    addNew: async (datosTexto) => {
      const texto = crearTexto(datosTexto);
      const { added } = await daoTextos.addNew(texto, "idTexto");
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

export { crearCUTextos };
