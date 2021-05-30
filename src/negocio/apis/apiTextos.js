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
    getAllByUser: async (idUsuario) => {
      return await daoTextos.getAllByUser(idUsuario);
    },
    getAllById: async (idTexto) => {
      return await daoTextos.getAllById(idTexto);
    },
    getAll: async () => {
      return await daoTextos.getAll();
    },
    deleteById: async (idTexto) => {
      const id = Number(idTexto);
      const { deleted } = await daoTextos.deleteById(id);
      if (!deleted) {
        throw crearErrorTextoNoEncontrado();
      }
    },
    updateById: async (datosTexto, idTexto) => {
      const id = Number(idTexto);
      const texto = crearTexto(datosTexto, id);
      const { updated } = await daoTextos.updateById(texto);
      if (!updated) {
        throw crearErrorTextoNoEncontrado();
      }
      return texto;
    },
  };
}

export { crearApiTextos };
