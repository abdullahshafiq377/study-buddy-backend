// Import Statements
const express = require("express");
const router = express.Router();
const paraQuery = require("../utils/db");

// Get Route for alerts
// Returns all the alert records from the database as response
router.get("/", async (req, res) => {
  let x = await paraQuery("SELECT * FROM alert", []);
  console.log(x);
  res.json(x);
});

// Post route for alerts
// Adds the given alert through request body to the database
router.post("/", async (req, res) => {
  let b = req.body;
  let x = await paraQuery(
    "INSERT INTO alert (title, description, class_id) VALUES (?, ?, ?)",
    [b.title, b.description, b.class_id]
  );
  res.status(200).json(x);
});

// Delete route for alerts
// Deletes a specfied alert based on the id given
router.delete("/", async (req, res) => {
  let x = await paraQuery("DELETE FROM alert WHERE id=?", [req.body.id]);
  console.log(x);
  res.json(x);
});

// TODO: to be implemented
// Post route for alerts
router.put("/", async (req, res) => {
  let b = req.body;
  let x = await paraQuery(
    "INSERT INTO alert (title, description, class_id) VALUES (?, ?, ?)",
    [b.title, b.description, b.class_id]
  );
  res.status(200).json(x);
});

module.exports = router;
