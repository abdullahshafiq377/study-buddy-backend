// Import Statements
const express = require("express");
const router = express.Router();
const paraQuery = require("../../utils/db");


// Get Route for departments
// Returns all the departments from the database as response
router.get("/", async (req, res) => {
  let x = await paraQuery("SELECT * FROM department", []);
  console.log(x);
  res.json(x);
});

// Post route for departments
// Adds the given department through request body to the database
router.post("/", async (req, res) => {
  let b = req.body;
  let x = await paraQuery(
    "INSERT INTO department (title, description) VALUES (?, ?)",
    [b.title, b.description]
  );
  res.status(200).json(x);
});

// Delete route for departments
// Deletes a specfied department based on the id given
router.delete("/", async (req, res) => {
  let x = await paraQuery("DELETE FROM department WHERE id=?", [req.body.id]);
  console.log(x);
  res.json(x);
});

// TODO: to be implemented
// Post route for departments
router.put("/", async (req, res) => {
  let b = req.body;
  let x = await paraQuery(
    "INSERT INTO department (title, description) VALUES (?, ?)",
    [b.title, b.description]
  );
  res.status(200).json(x);
});

module.exports = router;
