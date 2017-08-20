  "use strict";

const express = require('express');
const router  = express.Router();
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');

router.use(bodyParser.urlencoded({extended: true}));
router.use(cookieSession({
  secret: 'Wing got a wing'
}));

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("users.name")
      .count('winner as wins')
      .from("users")
      .innerJoin('archive', function () {
        this.on('users.id', '=', 'winner')
      })
      .groupBy('users.name')
      .orderBy("wins", 'desc')
      .then((results) => {
        res.json(results);
      });
  });

  router.get("/gamesPlayed/:userId", (req, res) => {
    knex
      .select("*")
      .from("archive")
      .where("player1_id",req.params.userId.slice(-1)).orWhere("player2_id",req.params.userId.slice(-1))
      .then((results) => {
        const games = { result: results };
        res.render("gamesPlayed", games);
      });
  });

  router.post("/", (req, res) => {

    knex
      .select("name")
      .from("users")
      .then((results) => {
        res.json(results);
      });
  });

  return router;
}
