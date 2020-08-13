const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const path = require("path");
const app = express();
const http = require('http');

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "hbs");
app.use("/assets", express.static("assets"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 250000);

app.get("/", (req, res) => {
  console.log(Date.now() + " Ping Received");
  res.status(200).render("index");
});

app.listen(3000, console.log("Listening on port 3000!"));
