function crearErrorIdTextoRepetido(message) {
  const error = new Error(message);
  error.type = "ERROR_ID_TEXTO_REPETIDO";
  return error;
}

export { crearErrorIdTextoRepetido };
