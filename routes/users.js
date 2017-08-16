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

  router.post("/", (req, res) => {
    knex('users')
      .insert({name: `"${req.body.name}"`})
      .then(() => res.status(200).send(req.body.name))
      .catch(function(error) { console.error(error); });
  });

  return router;
}
