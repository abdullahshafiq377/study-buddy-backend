// Import Statements
const express = require("express");
const router = express.Router();
const paraQuery = require("../utils/db");

// Get Route for sub-admins
// Returns all the sub-admins from the database as response
router.get("/", async (req, res) => {
  let x = await paraQuery("SELECT * FROM sub_admin", []);
  console.log(x);
  res.json(x);
});

// Post route for sub-admins
// Adds the given sub-admin through request body to the database
router.post("/", async (req, res) => {
  let b = req.body;
  let x = await paraQuery(
    "INSERT INTO sub_admin (name, f_name, dob, gender, nationality, contact, email, image, department_id, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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

// Delete route for students
// Deletes a specfied sub-admin based on the id given
router.delete("/", async (req, res) => {
  let x = await paraQuery("DELETE FROM sub_admin WHERE id=?", [req.body.id]);
  console.log(x);
  res.json(x);
});

// TODO: to be implemented
// Post route for sub-admins
router.put("/", async (req, res) => {
  let b = req.body;
  let x = await paraQuery(
    "INSERT INTO sub_admin (name, f_name, dob, gender, nationality, contact, email, image, department_id, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
