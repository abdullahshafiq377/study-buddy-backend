// Import Statements
const express = require("express");
const router = express.Router();
const paraQuery = require("../utils/db");

// Get Route for instructors
// Returns all the instructor from the database as response
router.get("/", async (req, res) => {
  let x = await paraQuery("SELECT * FROM instructor", []);
  console.log(x);
  res.json(x);
});

// Post route for instructors
// Adds the given instructor through request body to the database
router.post("/", async (req, res) => {
  let b = req.body;
  let x = await paraQuery(
    "INSERT INTO instructor (name, f_name, dob, gender, nationality, contact, email, image, department_id, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
    ]
  );
  res.status(200).json(x);
});

// Delete route for instructors
// Deletes a specfied instructor based on the id given
router.delete("/", async (req, res) => {
  let x = await paraQuery("DELETE FROM instructor WHERE id=?", [req.body.id]);
  console.log(x);
  res.json(x);
});

// TODO: to be implemented
// Post route for instructor
router.put("/", async (req, res) => {
  let b = req.body;
  let x = await paraQuery(
    "INSERT INTO instructor (name, f_name, dob, gender, nationality, contact, email, image, department_id, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
    ]
  );
  res.status(200).json(x);
});

module.exports = router;
