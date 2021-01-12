const express = require("express");
const rates = require("./api/rates");

const dotenv = require("dotenv");

const App = express();
dotenv.config();

App.use(express.json());

App.use("/", rates);

const port = process.env.PORT;

App.listen(port, () => {
  console.log("server running on port " + port);
});
