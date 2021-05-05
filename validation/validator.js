const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const User = require("../models/user");

function encryptPassword(passwordToEncrypt) {
  let salt = bcrypt.genSaltSync(SALT_ROUNDS);
  let hash = bcrypt.hashSync(passwordToEncrypt, salt);
  return hash;
}

function checkPassword(password, dbPassword) {
  let isValid = bcrypt.compareSync(password, dbPassword);
  console.log("checkPassword", password, dbPassword, isValid);
  return isValid;
}

async function validateUserCredentials(username, password) {
  let foundUser = await User.findAll({ where: { username, password } });
  console.log("validateUserCredentials", foundUser);
  return foundUser ? true : false;
}

// const DUMMY_PASSWORD = "zintis";
// let pass = encryptPassword(DUMMY_PASSWORD);
// checkPassword(DUMMY_PASSWORD, pass);

module.exports = {
  encryptPassword,
  checkPassword,
  validateUserCredentials,
};
