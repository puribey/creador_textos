function crearDaoArchivosCache() {
  const archivos = [];

  return {
    add: async (archivo) => {
      archivos.push(archivo);
      const urlPdf = `${process.env.DEV_HOST}/${archivo.originalname}`;
      return urlPdf;
    },
  };
}

export { crearDaoArchivosCache };
