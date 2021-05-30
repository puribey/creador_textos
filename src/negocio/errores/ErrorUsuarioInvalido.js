function crearErrorUsuarioInvalido(message) {
  const error = new Error(message);
  error.type = "ERROR_USUARIO_INVALIDO";
  return error;
}

export { crearErrorUsuarioInvalido };
