function crearDaoTextosCache() {
  const textos = [];

  return {
    addUnique: async (texto, titulo) => {
      const existe = textos.some((e) => {
        return e[titulo] === texto[titulo];
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
