const User = require("./users");
const Loop = require("./loops");

User.hasMany(Loop, {
  as: "loops",
  foreignKey: "user_id",
  onDelete: "cascade",
  hooks: true,
});
// Loop.belongsTo(User, { as: "user" });

// User.hasMany(Blog, {
//   foreignKey: "user_id",
// });
// Blog.belongsTo(User, {
//   foreignKey: "user_id",
// });

// Loop.belongsToMany(User, { through: "favourites" });
// User.belongsToMany(Loop, { through: "favourites" });

// Loop.belongsToMany(User, { through: "follows" });
// User.belongsToMany(Loop, { through: "follows" });