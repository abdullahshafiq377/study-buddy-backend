// Import Statements
const express = require("express");
const router = express.Router();
const paraQuery = require("../utils/db");

// Get Route for events
// Returns all the events from the database as response
router.get("/", async (req, res) => {
  let x = await paraQuery("SELECT * FROM event", []);
  console.log(x);
  res.json(x);
});

// Post route for events
// Adds the given event through request body to the database
router.post("/", async (req, res) => {
  let b = req.body;
  let x = await paraQuery(
    "INSERT INTO event (title, description, date_time, venue) VALUES (?, ?, ?, ?)",
    [b.title, b.description, b.date_time, b.venue]
  );
  res.status(200).json(x);
});

// Delete route for events
// Deletes a specfied event based on the id given
router.delete("/", async (req, res) => {
  let x = await paraQuery("DELETE FROM event WHERE id=?", [req.body.id]);
  console.log(x);
  res.json(x);
});

// TODO: to be implemented
// Post route for event
router.put("/", async (req, res) => {
  let b = req.body;
  let x = await paraQuery(
    "INSERT INTO event (title, description, date_time, venue) VALUES (?, ?, ?, ?)",
    [b.title, b.description, b.date_time, b.venue]
  );
  res.status(200).json(x);
});

module.exports = router;
