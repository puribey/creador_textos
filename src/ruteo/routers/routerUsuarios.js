import express from "express";

// TODO ver como acoplar esto a quien haga los usuarios
function crearRouterUsuarios(apiUsuarios) {
  const routerUsuarios = express.Router();

  //   routerUsuarios.post(`${path}/signin`, (req, res, next) => {
  //     const user = users.filter((user) => user.id === req.body.id)[0];
  //     if (user === undefined) {
  //       return res.status(404).send("Usuario no encontrado");
  //     }
  //     const token = getToken({ id: user.id });
  //     res.json({ token });
  //   });

  //   routerUsuarios.post(`${path}/signup`, (req, res, next) => {
  //     const user = users.filter((user) => user.id === req.body.id)[0];
  //     if (user !== undefined) {
  //       return res.status(404).send("Usuario ya existente");
  //     }
  //     users.push(req.body);
  //     const token = getToken({ id: req.body.id });
  //     res.json({ token });
  //   });

  return routerUsuarios;
}

export { crearRouterUsuarios };
