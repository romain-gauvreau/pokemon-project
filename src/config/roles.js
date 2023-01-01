const allRoles = {
  trainer: ["getTrainers", "getPokemons", "managePokemons"],
  admin: ["getTrainers", "manageTrainers", "getPokemons", "managePokemons"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export { roles, roleRights };
