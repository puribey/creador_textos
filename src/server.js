import express from "express";
import crearRouterTextos from "./textosRouter.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from "dotenv";
dotenv.config();

function crearServidor({ port = 0 }) {
  const app = express();

  app.use(express.json());
  app.use(express.static(path.join(__dirname, "uploads")));

  app.use("/textos", crearRouterTextos());

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
