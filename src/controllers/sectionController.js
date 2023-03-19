const paraQuery = require('../utils/db');
const mysql = require("mysql2/promise");


const getAllSections = async (req, res) => {
    try {
        let x = await paraQuery('SELECT * FROM section', []);
        console.log(x);
        res.json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};
const getSectionsByDepartment = async (req, res) => {
    try {
        let {departmentId} = req.params;

        let x = await paraQuery('SELECT section.id, section.title, semester, course_id, c.title AS course_title,instructor_id, name AS instructor_name, section.department_id from section INNER JOIN course c on section.course_id = c.id LEFT JOIN instructor i on section.instructor_id = i.id WHERE section.department_id = ?', [departmentId]);
        console.log(x);
        res.json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const createNewSection = async (req, res) => {
    try {
        let {
            title, courseId, departmentId, semester, instructorId
        } = req.body;

        let x = await paraQuery('INSERT INTO section (title, course_id, department_id, semester, instructor_id) VALUES (?, ?, ?, ?, ?)', [title, courseId, departmentId, semester, instructorId],);
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const deleteSection = async (req, res) => {
    try {
        let {id} = req.params;

        let x = await paraQuery('DELETE FROM section WHERE id=?', [id]);
        console.log(x);
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const updateSection = async (req, res) => {
    try {
        let {
            title, courseId, departmentId, semester, instructorId
        } = req.body;
        let {id} = req.params;

        let x = await paraQuery('UPDATE section SET title=?, course_id=?, department_id=?, semester=?, instructor_id=? WHERE id=?', [title, courseId, departmentId, semester, instructorId, id,],);
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

module.exports = {getAllSections, getSectionsByDepartment, createNewSection, updateSection, deleteSection};
