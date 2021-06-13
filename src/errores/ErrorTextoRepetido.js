function crearErrorTextoRepetido(message) {
  const error = new Error(message);
  error.type = "ERROR_TEXTO_REPETIDO";
  return error;
}

export { crearErrorTextoRepetido };
