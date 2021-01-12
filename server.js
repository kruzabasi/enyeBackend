const express = require("express");
// const ourPath = require("path");
// const ourFs = require("fs");
const rates = require("./api/rates");

const dotenv = require("dotenv");

const App = express();
dotenv.config();

App.use(express.json());

// App.get("/", (req, res) => {
//   ourFs.readFile(ourPath.join(__dirname, "index.html"), (error, data) => {
//     res.writeHead(200, { "content-type": "text/html" });
//     res.write(data);
App.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

App.use("/api/rates", rates);

const port = process.env.PORT;

App.listen(port, () => {
  console.log("server running on port " + port);
});
