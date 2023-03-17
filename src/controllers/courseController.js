const paraQuery = require('../utils/db');
const mysql = require("mysql2/promise");
const {getStudentObjById, getCurrentSemester} = require("./studentController");
const {getSystemDetails} = require("./systemController");

const getAllCourses = async (req, res) => {
    try {
        let x = await paraQuery('SELECT * FROM course', []);
        console.log(x);
        res.json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const getCourseById = async (req, res) => {
    try {
        let {id} = req.params;

        let x = await paraQuery('SELECT * FROM course WHERE id=?', [id]);
        console.log(x);
        res.json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const createNewCourse = async (req, res) => {
    try {
        let {
            title, credit_hours, department_id, program_id, pre_reqs, min_semester, offered, course_code, description,
        } = req.body;

        let x = await paraQuery('INSERT INTO course (title, credit_hours, department_id, program_id, pre_reqs, min_semester, offered, course_code, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [title, credit_hours, department_id, program_id, pre_reqs, min_semester, offered, course_code, description,],);
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const deleteCourse = async (req, res) => {
    try {
        let {id} = req.params;

        let x = await paraQuery('DELETE FROM course WHERE id=?', [id]);
        console.log(x);
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const updateCourse = async (req, res) => {
    try {
        let {
            title, credit_hours, department_id, program_id, pre_reqs, min_semester, offered, course_code, description,
        } = req.body;
        let {id} = req.params;

        let x = await paraQuery('UPDATE course SET title=?, credit_hours=?, department_id=?, program_id=?, pre_reqs=?, min_semester=?, offered=?, course_code=?, description=? WHERE id=?', [title, credit_hours, department_id, program_id, pre_reqs, min_semester, offered, course_code, description, id,],);
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const getCoursesForRegistration = async (req, res) => {
    try {
        const {stdId} = req.params;
        const student = await getStudentObjById(stdId);

        if (student) {
            const {program_id, session} = student;
            const currentSemester = await getCurrentSemester(session);

            const connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            });
            await connection.execute('CREATE TEMPORARY TABLE IF NOT EXISTS filtered_courses AS (SELECT * FROM course WHERE offered = 1 AND program_id = ? AND min_semester <= ?);', [program_id, currentSemester]);
            await connection.execute('CREATE TEMPORARY TABLE IF NOT EXISTS relevant_pre_reqs AS (SELECT pre_req.course_id, pre_req.pre_req_id FROM pre_req INNER JOIN filtered_courses ON filtered_courses.id = pre_req.course_id);', []);
            await connection.execute('CREATE TEMPORARY TABLE IF NOT EXISTS cleared_courses AS (SELECT course_id FROM result WHERE grade != \'F\' AND student_id = ?);', [stdId]);
            await connection.execute('CREATE TEMPORARY TABLE IF NOT EXISTS uncleared_pre_reqs AS (SELECT relevant_pre_reqs.course_id, pre_req_id FROM relevant_pre_reqs LEFT JOIN cleared_courses ON (pre_req_id = cleared_courses.course_id) WHERE cleared_courses.course_id IS NULL);', []);
            await connection.execute('CREATE TEMPORARY TABLE IF NOT EXISTS uncleared_pre_reqs_removed AS (SELECT id, title, credit_hours, course_code FROM filtered_courses LEFT JOIN uncleared_pre_reqs ON (course_id = filtered_courses.id) WHERE uncleared_pre_reqs.pre_req_id IS NULL);', []);
            await connection.execute('CREATE TEMPORARY TABLE IF NOT EXISTS registered_courses AS (SELECT course.id, title, credit_hours, course_code FROM course INNER JOIN registration r on course.id = r.course_id WHERE student_id=?);', [stdId]);

            const [rows, fields] = await connection.execute('SELECT uncleared_pre_reqs_removed.id, uncleared_pre_reqs_removed.title, uncleared_pre_reqs_removed.credit_hours, uncleared_pre_reqs_removed.course_code FROM uncleared_pre_reqs_removed LEFT JOIN registered_courses ON (registered_courses.id = uncleared_pre_reqs_removed.id) WHERE registered_courses.id IS NULL;', []);

            connection.end();

            console.log(rows);
            res.json(rows);
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const getRegisteredCourses = async (req, res) => {
    try {
        let {stdId} = req.params;

        let x = await paraQuery('SELECT course.id, title, credit_hours, course_code FROM course INNER JOIN registration r on course.id = r.course_id WHERE student_id = ?', [stdId],);
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};
const registerCourse = async (req, res) => {
    try {
        let {studentId, courseId} = req.body;
        const {current_session: currentSession} = await getSystemDetails();

        let x = await paraQuery('INSERT INTO registration (student_id, course_id, session) VALUES (?, ?, ?)', [studentId, courseId, currentSession],);
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const unregisterCourse = async (req, res) => {
    try {
        let {studentId, courseId} = req.body;

        let x = await paraQuery('DELETE FROM registration WHERE student_id=? AND course_id=?', [studentId, courseId],);
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

module.exports = {
    getAllCourses,
    getCourseById,
    createNewCourse,
    updateCourse,
    deleteCourse,
    getCoursesForRegistration,
    getRegisteredCourses,
    registerCourse,
    unregisterCourse
};
