// Import Statements
const express = require("express");
const router = express.Router();
const paraQuery = require("../utils/db");

// Get Route for students
// Returns all the students from the database as response
router.get("/", async (req, res) => {
  let x = await paraQuery("SELECT * FROM student", []);
  console.log(x);
  res.json(x);
});

// Post route for students
// Adds the given student through request body to the database
router.post("/", async (req, res) => {
  let b = req.body;
  let x = await paraQuery(
    "INSERT INTO student (name, f_name, dob, gender, nationality, contact, email, image,department_id, password, program_id, program_title, session, reg_num) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      b.name,
      b.f_name,
      b.dob,
      b.gender,
      b.nationality,
      b.contact,
      b.email,
      b.image,
      b.department_id,
      b.password,
      b.program_id,
      b.program_title,
      b.session,
      b.reg_num,
    ]
  );
  res.status(200).json(x);
});

// Delete route for students
// Deletes a specfied student based on the id given
router.delete("/", async (req, res) => {
  let x = await paraQuery("DELETE FROM student WHERE id=?", [req.body.id]);
  console.log(x);
  res.json(x);
});

// TODO: to be implemented
// Post route for students
router.put("/", async (req, res) => {
  let b = req.body;
  let x = await paraQuery(
    "INSERT INTO student (name, f_name, dob, gender, nationality, contact, email, image,department_id, password, program_id, program_title, session, reg_num) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      b.name,
      b.f_name,
      b.dob,
      b.gender,
      b.nationality,
      b.contact,
      b.email,
      b.image,
      b.department_id,
      b.password,
      b.program_id,
      b.program_title,
      b.session,
      b.reg_num,
    ]
  );
  res.status(200).json(x);
});

module.exports = router;
