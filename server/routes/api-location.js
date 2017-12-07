const db = require("../models");
const { User, Location, Transaction } = require("../controllers");
const express = require("express");

const router = express.Router();

router.get("/users", (req, res) => {
  db.User.findAll({
    attributes: ["username", "firstName", "image"]
  })
  .then(data => {
    res.json(data);
  })
})

module.exports = router;