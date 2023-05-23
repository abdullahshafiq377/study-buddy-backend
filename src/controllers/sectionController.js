const paraQuery = require('../utils/db');
const mysql = require("mysql2/promise");
const {createNewGrade, deleteGrade} = require('./gradeController');

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

const getSectionById = async (req, res) => {
    try {
        let {id} = req.params;

        let x = await paraQuery('SELECT section.id, section.title, semester, course_id, c.title AS course_title,instructor_id, name AS instructor_name, section.department_id from section INNER JOIN course c on section.course_id = c.id LEFT JOIN instructor i on section.instructor_id = i.id WHERE section.id = ?', [id]);
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

const getSectionByInstructor = async (req, res) => {
    try {
        let {instructorId} = req.params;
        
        let x = await paraQuery('SELECT section.id, section.title, semester, course_id, c.title AS course_title,instructor_id, name AS instructor_name, section.department_id from section INNER JOIN course c on section.course_id = c.id LEFT JOIN instructor i on section.instructor_id = i.id WHERE section.instructor_id = ?', [instructorId]);
        console.log(x);
        res.json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};
const getStudentSections = async (req, res) => {
    try {
        let {studentId} = req.params;
        
        let x = await paraQuery('SELECT course.id, s.id as section_id, s.title, course.title as course_title, s.instructor_id FROM course INNER JOIN registration r on course.id = r.course_id LEFT JOIN section s on r.section_id = s.id WHERE student_id = ?', [studentId]);
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

const getAssignedStudents = async (req, res) => {
    try {
        const {sectionId} = req.params;

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        await connection.execute('CREATE TEMPORARY TABLE IF NOT EXISTS assigned_student_ids AS (SELECT student_id, r.id AS registration_id FROM section INNER JOIN registration r on section.id = r.section_id WHERE section_id = ?);', [sectionId]);

        const [rows, fields] = await connection.execute('SELECT id, name, session, program_title, reg_num, email, registration_id FROM student INNER JOIN assigned_student_ids usi on student.id = usi.student_id;', []);

        connection.end();

        console.log(rows);
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};
const getAssignedStudentsObj = async (sectionId) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        await connection.execute('CREATE TEMPORARY TABLE IF NOT EXISTS assigned_student_ids AS (SELECT student_id, r.id AS registration_id FROM section INNER JOIN registration r on section.id = r.section_id WHERE section_id = ?);', [sectionId]);

        const [rows, fields] = await connection.execute('SELECT id, name, session, program_title, reg_num, email, registration_id FROM student INNER JOIN assigned_student_ids usi on student.id = usi.student_id;', []);

        connection.end();

        console.log(rows);
        return rows;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getUnassignedStudents = async (req, res) => {
    try {
        const {courseId} = req.params;

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        await connection.execute('CREATE TEMPORARY TABLE IF NOT EXISTS unassigned_student_ids AS (SELECT student_id, r.id AS registration_id FROM section INNER JOIN registration r on section.course_id = r.course_id WHERE section.course_id = ? AND section_id IS NULL);', [courseId]);

        const [rows, fields] = await connection.execute('SELECT id, name, session, program_title, reg_num, email, registration_id FROM student INNER JOIN unassigned_student_ids usi on student.id = usi.student_id;', []);

        connection.end();

        console.log(rows);
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const assignSection = async (req, res) => {
    const {sectionId, registrationId, studentId} = req.body;
    try {
        let x = await paraQuery('UPDATE registration SET section_id=? WHERE id=?', [sectionId, registrationId]);
        await createNewGrade(studentId, sectionId, registrationId);
        console.log(x);
        res.json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};
const unassignSection = async (req, res) => {
    const {registrationId, studentId} = req.body;
    try {
        let x = await paraQuery('UPDATE registration SET section_id=? WHERE id=?', [null, registrationId]);
        await deleteGrade(registrationId, studentId)
        console.log(x);
        res.json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

module.exports = {
    getAllSections,
    getSectionById,
    getSectionsByDepartment,
    getSectionByInstructor,
    getStudentSections,
    createNewSection,
    updateSection,
    deleteSection,
    getAssignedStudents,
    getUnassignedStudents,
    assignSection,
    unassignSection,
    getAssignedStudentsObj
};
