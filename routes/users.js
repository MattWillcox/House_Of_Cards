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
      .select("*")
      .from("users")
      .orderBy("wins")
      .then((results) => {
        res.json(results);
      });
  });

  router.post('/', (req, res) => {
    req.session.userId = users[userId]


  });

  router.post("/register", (req, res) => {
    knex('users')
      .insert({name: req.body.name})
      .then(() => res.status(200).send(req.body.name))
      .catch(function(error) { console.error(error); });
  });

  //put
  router.post("/win", (req, res) => {
  knex('users')
    .where('name', '=', req.body.name)
    .increment('wins')
    .then(() => res.status(200).send(req.body.name))
    .catch(function(error) { console.error(error); });
  });

  //put
  router.post("/loss", (req, res) => {
  knex('users')
    .where('name', '=', req.body.name)
    .increment('losses')
    .then(() => res.status(200).send(req.body.name))
    .catch(function(error) { console.error(error); });
  });

  router.post("/", (req, res) => {

    knex
      .select("name")
      .from("users")
      .where("name", req.body.name)
      .then((results) => {
        res.json(results);
      });
  });

  return router;
}
