// Import Statements
const express = require("express");
const router = express.Router();
const paraQuery = require("../utils/db");

// Get Route for courses
// Returns all the courses from the database as response
router.get("/", async (req, res) => {
  let x = await paraQuery("SELECT * FROM course", []);
  console.log(x);
  res.json(x);
});

// Post route for courses
// Adds the given course through request body to the database
router.post("/", async (req, res) => {
  let b = req.body;
  let x = await paraQuery(
    "INSERT INTO course (title, credit_hours, department_id, program_id, pre_reqs, min_semester, offered, course_code, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      b.title,
      b.credit_hours,
      b.department_id,
      b.program_id,
      b.pre_reqs,
      b.min_semester,
      b.offered,
      b.course_code,
      b.description,
    ]
  );
  res.status(200).json(x);
});

// Delete route for courses
// Deletes a specfied course based on the id given
router.delete("/", async (req, res) => {
  let x = await paraQuery("DELETE FROM course WHERE id=?", [req.body.id]);
  console.log(x);
  res.json(x);
});

// TODO: to be implemented
// Post route for courses
router.put("/", async (req, res) => {
  let b = req.body;
  let x = await paraQuery(
    "INSERT INTO course (title, credit_hours, department_id, program_id, pre_reqs, min_semester, offered, course_code, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      b.title,
      b.credit_hours,
      b.department_id,
      b.program_id,
      b.pre_reqs,
      b.min_semester,
      b.offered,
      b.course_code,
      b.description,
    ]
  );
  res.status(200).json(x);
});

module.exports = router;
