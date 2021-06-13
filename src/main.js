import { crearServidor } from "./server.js";
import { crearDaoTextosCache } from "./daoTextosCache.js";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";

async function main() {
  const daoTextos = crearDaoTextosCache();
  await crearServidor({ port: 8080 });

  const filePath = "./fileToUpload/worksheetskindergarten.pdf";
  const form = new FormData();
  form.append("demo", fs.createReadStream(filePath));
  // form.append("idUsuario", "43820248");
  // form.append("idUsuario", "00000000"); // Usuario falso, debe borrar archivo subido
  form.append("titulo", "Un nuevo cuento");
  form.append("genero", "poesia");
  form.append("tienePdf", "true");
  try {
    const resPost = await axios({
      method: "post",
      url: "http://localhost:8080/textos",
      data: form,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
        "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQzODIwMjQ4IiwiaWF0IjoxNjIyNDE2ODI5fQ.-8afDQtgoRWqvtfR_4E2VhzpFOibK-P_mIaov-kYv9o",
      },
    });
    console.log("crear texto res:", resPost.data);
  } catch (err) {
    console.log(err.message);
  }

  // servidor.close();
  // mongoClient.close();
}

main();
