import express from "express";

import { crearRouterTextos } from "./routers/routerTextos.js";
// import { crearRouterUsuarios } from "./routers/routerUsuarios.js";

function crearServidor({ aplicacion, port = 0 }) {
  const app = express();

  app.use(express.json());

  app.use(express.static("uploads"));

  app.use("/api/textos", crearRouterTextos(aplicacion));
  // app.use("/api/usuarios", crearRouterUsuarios(aplicacion));

  return new Promise((resolve, reject) => {
    const server = app
      .listen(port)
      .once("error", () => {
        reject(new Error("error al conectarse al servidor"));
      })
      .once("listening", () => {
        server.port = server.address().port;
        console.log(`Listening on http://localhost:${server.port}/`);
        resolve(server);
      });
  });
}

export { crearServidor };
