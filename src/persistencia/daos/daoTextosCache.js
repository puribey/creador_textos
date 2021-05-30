function crearDaoTextosCache() {
  const textos = [];

  return {
    addUnique: async (texto, claveUnica) => {
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
    // TODO
    getAllByUser: async (idUsuario) => {
      return [...textos];
    },
    // TODO
    getAllById: async (idTexto) => {
      return [...textos];
    },
    getAll: async () => {
      return [...textos];
    },
    deleteById: async (idTexto) => {
      const indiceParaBorrar = textos.findIndex((e) => e.id == idTexto);
      if (indiceParaBorrar === -1) {
        return { deleted: 0 };
      } else {
        textos.splice(indiceParaBorrar, 1);
        return { deleted: 1 };
      }
    },
    updateById: async (texto) => {
      const indiceParaReemplazar = textos.findIndex((e) => e.id == texto.id);
      if (indiceParaReemplazar === -1) {
        return { updated: 0 };
      } else {
        textos.splice(indiceParaReemplazar, 1, texto);
        return { updated: 1 };
      }
    },
  };
}

export { crearDaoTextosCache };
