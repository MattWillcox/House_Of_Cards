"use strict";




require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const http        = require('http').createServer(app);
const io          = require('socket.io')(http);

// Seperated Routes for each Resource
const sockets = require("./lib/sockets")
const usersRoutes = require("./routes/users");

// Cookies
var cookieParser = require('cookie-parser');
app.use(cookieParser());

http.listen(8080, '0.0.0.0');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex,io));


// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.post('/gameResult', (req, res) => {
  req.body.player1;
  req.body.player2;
  req.body.winner;
  knex('archive')
    .insert({player1_id: req.body.player1, player2_id: req.body.player2, winner: req.body.winner})
    .then(() =>
      res.status(200).send());
});

app.post("/login", (req, res) => {
  res.cookie("userId", req.body.userId);
  res.end();
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

sockets(io, knex);

app.get("/goofspiel", (req, res) => {
  console.log(req.cookies);
  res.render("goofspiel")
});

app.get("/war", (req, res) => {
  console.log(req.cookies);
  res.render("war")
});
