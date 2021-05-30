import { crearServidor } from "./ruteo/Servidor.js";
import { crearApiTextos } from "./negocio/apis/apiTextos.js";
import { crearClienteRest } from "../test/ClienteRest.js";
import { crearDaoTextosCache } from "./persistencia/daos/daoTextosCache.js";

async function main() {
  const daoTextos = crearDaoTextosCache();

  const aplicacion = crearApiTextos({ daoTextos });
  const servidor = await crearServidor({ aplicacion, port: 8080 });

  const cliente = crearClienteRest({
    url: `http://localhost:${servidor.port}/api/textos`,
  });

  await cliente.post({
    nombre: "mariano",
    apellido: "aquino",
    edad: 34,
    dni: "123",
  });

  const { data } = await cliente.getAll();

  console.log(data);

  servidor.close();

  mongoClient.close();
}

main();
