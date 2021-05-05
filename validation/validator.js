const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

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

// const DUMMY_PASSWORD = "zintis";
// let pass = encryptPassword(DUMMY_PASSWORD);
// checkPassword(DUMMY_PASSWORD, pass);

module.exports = {
  encryptPassword,
  checkPassword,
};
