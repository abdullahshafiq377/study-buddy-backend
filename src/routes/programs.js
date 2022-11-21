// Import Statements
const express = require("express");
const router = express.Router();
const paraQuery = require("../utils/db");

// Get Route for programs
// Returns all the programs from the database as response
router.get("/", async (req, res) => {
  let x = await paraQuery("SELECT * FROM program", []);
  console.log(x);
  res.json(x);
});

// Post route for programs
// Adds the given program through request body to the database
router.post("/", async (req, res) => {
  let b = req.body;
  let x = await paraQuery(
    "INSERT INTO program (title, description, department_id) VALUES (?, ?, ?)",
    [b.title, b.description, b.department_id]
  );
  res.status(200).json(x);
});

// Delete route for programs
// Deletes a specfied program based on the id given
router.delete("/", async (req, res) => {
  let x = await paraQuery("DELETE FROM program WHERE id=?", [req.body.id]);
  console.log(x);
  res.json(x);
});

// TODO: to be implemented
// Post route for programs
router.put("/", async (req, res) => {
  let b = req.body;
  let x = await paraQuery(
    "INSERT INTO program (title, description, department_id) VALUES (?, ?, ?)",
    [b.title, b.description, b.department_id]
  );
  res.status(200).json(x);
});

module.exports = router;
