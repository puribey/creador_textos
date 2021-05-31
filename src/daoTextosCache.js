function crearDaoTextosCache() {
  const textos = [];

  return {
    addNew: async (texto, claveUnica) => {
      const existe = textos.some((e) => {
        return e[claveUnica] === texto[claveUnica];
      });
      if (existe) {
        return { added: 0 };
      } else {
        textos.push(texto);
        return { added: 1 };
      }
    },
    getAllByUser: async ({ idUsuario }) => {
      return textos.filter((txt) => txt.idUsuario === idUsuario);
    },
  };
}

export { crearDaoTextosCache };
