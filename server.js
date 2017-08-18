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
const usersRoutes = require("./routes/users");
const goofspeilRoutes = require("./routes/goofspeilRoutes")

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
app.use("/api/users", usersRoutes(knex));

app.use("/goofspiel", goofspeilRoutes(knex));
// Home page
app.get("/", (req, res) => {
  res.render("index");
});



app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(client) {
    console.log('Client connected...');

    const state = {
      player1Hand: [1, 2, 3, 4],
      player2Hand: [1, 5, 6, 9]
    };

    client.on('play card', function(data) {
      const move = JSON.parse(data);

      state['player' + move.player + 'Hand'].splice(move.index, 1);
      console.log(state);
      client.emit('update state', state);
    });
});

app.get("/goofspiel", (req, res) => {
  res.render("goofspiel")
});

// app.listen(PORT, () => {
//   console.log("Example app listening on port " + PORT);

// });
