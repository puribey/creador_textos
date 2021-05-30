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
  };
}

export { crearDaoTextosCache };
