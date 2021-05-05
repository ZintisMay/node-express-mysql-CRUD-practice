const express = require("express");
const axios = require("axios");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
// var config = require("../config");
const User = require("./models/user");

const PORT = process.env.PORT || 3333;
const CONFIG_SECRET = "banana";
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/home.html");
});
app.get("/home", async (req, res) => {
  res.redirect("/");
});
app.get("/dashboard", async (req, res) => {
  res.sendFile(__dirname + "/dashboard.html");
});

app.get("/createUser/:username/:password", async (req, res) => {
  const { username, password } = req.params;
  let user = await User.create({
    username,
    password,
  });
  if (user) {
    console.log(user);
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .send({ message: "missing name or email or password" });
  }

  var hashedPassword = bcrypt.hashSync(password, 8);

  User.create(
    {
      name: name,
      email: email,
      password: hashedPassword,
    },
    function (err, user) {
      if (err)
        return res
          .status(500)
          .send("There was a problem registering the user.");
      // create a token
      var token = jwt.sign({ id: user._id }, CONFIG_SECRET, {
        expiresIn: 86400, // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    }
  );
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);
  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "missing name or email or password" });
  }

  var hashedPassword = bcrypt.hashSync(password, 8);

  let user = await User.findOne({
    where: { username: username, password: password },
  });
  console.log(user);
  if (user) {
    // create a token
    var token = jwt.sign({ id: user._id }, CONFIG_SECRET, {
      expiresIn: 86400, // expires in 24 hours
    });
    console.log(token);
    res.status(200).send({ auth: true, token: token });
  } else {
    res.status(500).send("There was a problem registering the user.");
  }
});

app.get("/me", (req, res) => {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, CONFIG_SECRET, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    res.status(200).send(decoded);
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
