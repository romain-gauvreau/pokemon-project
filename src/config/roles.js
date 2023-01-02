const allRoles = {
  trainer: ["getTrainers", "getPokemons", "managePokemons", "manageTrades"],
  admin: [
    "getTrainers",
    "manageTrainers",
    "getPokemons",
    "managePokemons",
    "manageTrades",
    "downloadLogs",
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export { roles, roleRights };
