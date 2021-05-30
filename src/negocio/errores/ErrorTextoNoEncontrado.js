function crearErrorTextoNoEncontrado() {
  const error = new Error("no existe texto con ese id");
  error.type = "ERROR_TEXTO_NO_ENCONTRADO";
  return error;
}

export { crearErrorTextoNoEncontrado };
