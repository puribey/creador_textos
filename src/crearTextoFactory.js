import { crearDaoUsuarioCache } from "./daoUsuarioCache.js";
import { crearDaoTextosCache } from "./daoTextosCache.js";
import { crearDaoArchivosCache } from "./daoArchivosCache.js";
import { crearTextoCU } from "./crearTextoCU.js";

function crearTextoFactory() {
  const daoUsuarios = crearDaoUsuarioCache();
  const daoTextos = crearDaoTextosCache();
  const datoArchivos = crearDaoArchivosCache();

  const crearTexto = crearTextoCU(daoUsuarios, daoTextos, datoArchivos);
  return crearTexto;
}

export default crearTextoFactory;
