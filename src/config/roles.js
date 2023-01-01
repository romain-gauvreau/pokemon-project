const allRoles = {
  trainer: ["getTrainers"],
  admin: ["getTrainers", "manageTrainers"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export { roles, roleRights };
