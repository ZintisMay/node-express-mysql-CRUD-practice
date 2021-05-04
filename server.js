console.log("starting server");
const express = require("express");
const axios = require("axios");
const PORT = process.env.PORT || 3333;

const app = express();

app.get("/", async (req, res) => {
  res.send("serving root");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
