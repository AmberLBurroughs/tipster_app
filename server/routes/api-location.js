const db = require("../models");
const { User, Location, Transaction } = require("../controllers");
const express = require("express");

const router = express.Router();

const pg = require("pg");
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/tipster_db';
const client = new pg.Client(connectionString);
client.connect();
// const query = client.query(
//   'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
// query.on('end', () => { client.end(); });

router.get("/users", (req, res) => {
  db.User.findAll({
    attributes: ["username", "firstName", "image"]
  })
  .then(data => {
    res.json(data);
  })
})

router.get("/:id/users", (req, res) => {
  if(!req.isAuthenticated()){ 
    res.status(400).json({success: false, message: "Not logged in"})
  }
  const results = (usersData) => {
    res.json(usersData)
  }

  Location.getWorkers(req.params.id, results);
})


module.exports = router;