// Import Statements
const express = require("express");
const router = express.Router();
const paraQuery = require("../utils/db");

// Get Route for notices
// Returns all the notice from the database as response
router.get("/", async (req, res) => {
  let x = await paraQuery("SELECT * FROM notice", []);
  console.log(x);
  res.json(x);
});

// Post route for notices
// Adds the given notice through request body to the database
router.post("/", async (req, res) => {
  let b = req.body;
  let x = await paraQuery("INSERT INTO notice (title, link) VALUES (?, ?)", [
    b.title,
    b.link,
  ]);
  res.status(200).json(x);
});

// Delete route for notices
// Deletes a specfied notice based on the id given
router.delete("/", async (req, res) => {
  let x = await paraQuery("DELETE FROM notice WHERE id=?", [req.body.id]);
  console.log(x);
  res.json(x);
});

// TODO: to be implemented
// Post route for notices
router.put("/", async (req, res) => {
  let b = req.body;
  let x = await paraQuery("INSERT INTO notice (title, link) VALUES (?, ?)", [
    b.title,
    b.link,
  ]);
  res.status(200).json(x);
});

module.exports = router;
