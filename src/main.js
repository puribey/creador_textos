import { crearCUTextos } from "./crearCUTextos.js";
import { crearDaoTextosCache } from "./daoTextosCache.js";

const textoConPdf = {
  idUsuario: "1a2s3d4f",
  titulo: "Texto uno",
  genero: "poesia",
  tienePdf: true,
  urlPdf: "http://localhost:8080/worksheetskindergarten.pdf",
};
const textoSinPdf = {
  idUsuario: "1a2s3d4f",
  titulo: "Texto uno",
  genero: "poesia",
  tienePdf: false,
  contenido: "Lorem ipsum",
};

async function main() {
  const daoTextos = crearDaoTextosCache();
  const casoUsoTextos = crearCUTextos({ daoTextos });

  let res;
  res = await casoUsoTextos.addNew(textoConPdf);
  console.log("Res caso feliz con pdf", res);

  res = await casoUsoTextos.addNew(textoSinPdf);
  console.log("Res caso feliz sin pdf", res);

  /**
   * Error: Caso texto con mismo id
   */
  try {
    res = await casoUsoTextos.addNew({ ...textoSinPdf, idTexto: 1 });
  } catch (err) {
    console.log(err.message);
  }

  /**
   * Error: Caso con texto sin pdf y sin contenido
   */
  try {
    res = await casoUsoTextos.addNew({ ...textoSinPdf, contenido: null });
  } catch (err) {
    console.log(err.message);
  }

  /**
   * Error: Caso con url pdf invalida
   */
  try {
    res = await casoUsoTextos.addNew({ ...textoConPdf, urlPdf: "jfsbadkfbkb" });
  } catch (err) {
    console.log(err.message);
  }

  /**
   * Error: Caso con genero inexistente
   */
  try {
    res = await casoUsoTextos.addNew({ ...textoConPdf, genero: "no_existe" });
  } catch (err) {
    console.log(err.message);
  }

  /**
   * Error: Caso con titulo vacío
   */
  try {
    res = await casoUsoTextos.addNew({ ...textoConPdf, titulo: "" });
  } catch (err) {
    console.log(err.message);
  }

  /**
   * Trae 2 textos por ese usuario
   */
  res = await casoUsoTextos.getAllByUser({ idUsuario: "1a2s3d4f" });
  console.log(res);

  /**
   * Usuario sin textos subidos = []
   */
  res = await casoUsoTextos.getAllByUser({ idUsuario: "4f3d2s1a" });
  console.log(res);
}

main();
