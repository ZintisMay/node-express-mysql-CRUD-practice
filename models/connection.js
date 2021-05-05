const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("CRUD_PRACTICE", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
