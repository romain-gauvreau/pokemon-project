const getPagination = (page, size) => {
  const limit = size ? +size : 1;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: pokemons } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, pokemons, totalPages, currentPage };
};

export { getPagination, getPagingData };
