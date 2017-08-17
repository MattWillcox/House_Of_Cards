"use strict";

const express = require('express');
const router  = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: true}));

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
      });
  });

  router.post("/register", (req, res) => {
    // knex.select('name').from('users').where('name', req.body.name)
    // .then((results) =>
    knex('users')
      .insert({name: req.body.name})
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
