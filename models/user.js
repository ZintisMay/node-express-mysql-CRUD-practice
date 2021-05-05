const sequelize = require("./connection");
const { Sequelize, DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.associate = function (models) {
  // associations can be defined here
};

module.exports = User;
