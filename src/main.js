import { crearServidor } from "./ruteo/Servidor.js";
import { crearApiTextos } from "./negocio/apis/apiTextos.js";
import { crearDaoTextosCache } from "./persistencia/daos/daoTextosCache.js";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";

async function main() {
  const daoTextos = crearDaoTextosCache();

  const aplicacion = crearApiTextos({ daoTextos });
  await crearServidor({ aplicacion, port: 8080 });

  const filePath = "./fileToUpload/worksheetskindergarten.pdf";
  const form = new FormData();
  form.append("demo", fs.createReadStream(filePath));
  form.append("tienePdf", "true");
  try {
    const resPost = await axios({
      method: "post",
      url: "http://localhost:8080/api/textos",
      data: form,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
      },
    });
    console.log("Upload response", resPost.data);
  } catch (err) {
    console.log(err.message);
  }

  // servidor.close();
  // mongoClient.close();
}

main();
