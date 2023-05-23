const paraQuery = require('../utils/db');
require('dotenv').config();
const getPasswordHash = require('./../utils/passwordHash');
const {getSystemDetails} = require("./systemController");
const {saveFile} = require('../utils/saveFiles');
const bcrypt = require('bcrypt');

const getAllStudents = async (req, res) => {
    console.log('a')

    try {
        let x = await paraQuery('SELECT * FROM student', []);
        console.log(x);
        res.json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const getStudentById = async (req, res) => {
    try {
        let {id} = req.params;

        let x = await paraQuery('SELECT * FROM student WHERE id=?', [id]);
        console.log(x);
        res.json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const createNewStudent = async (req, res) => {
    try {
        let {
            name,
            f_name,
            dob,
            gender,
            nationality,
            contact,
            email,
            image,
            department_id,
            program_id,
            program_title,
            session,
            reg_num,
        } = req.body;
        
        let imageName = process.env.DEFAULT_IMAGE_NAME;
        if (req.files) {
            let {image} = req.files;
            console.log(image);
            imageName = await saveFile(image);
            if (imageName === null) {
                imageName = process.env.DEFAULT_IMAGE_NAME;
            }
        }
        console.log(imageName);
        let password = await getPasswordHash(process.env.DEFAULT_PASSWORD);

        let x = await paraQuery(
            'INSERT INTO student (name, f_name, dob, gender, nationality, contact, email, image,department_id, password, program_id, program_title, session, reg_num, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                name,
                f_name,
                dob,
                gender,
                nationality,
                contact,
                email,
                image,
                department_id,
                password,
                program_id,
                program_title,
                session,
                reg_num,
                imageName
            ],
        );
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const deleteStudent = async (req, res) => {
    try {
        let {id} = req.params;

        let x = await paraQuery('DELETE FROM student WHERE id=?', [id]);
        console.log(x);
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const updateStudent = async (req, res) => {
    try {
        let {
            name,
            f_name,
            dob,
            gender,
            nationality,
            contact,
            email,
            image,
            department_id,
            program_id,
            program_title,
            session,
            reg_num,
        } = req.body;
        
        let {id} = req.params;
        
        let imageName = process.env.DEFAULT_IMAGE_NAME;
        if (req.files) {
            let {image} = req.files;
            console.log(image);
            imageName = await saveFile(image);
            if (imageName === null) {
                imageName = process.env.DEFAULT_IMAGE_NAME;
            }
        }
        
        let x = await paraQuery(
            'UPDATE student SET name=?, f_name=?, dob=?, gender=?, nationality=?, contact=?, email=?, image=?,department_id=?, program_id=?, program_title=?, session=?, reg_num=? WHERE id=?',
            [
                name,
                f_name,
                dob,
                gender,
                nationality,
                contact,
                email,
                imageName,
                department_id,
                program_id,
                program_title,
                session,
                reg_num,
                id,
            ],
        );
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const updateStudentPassword = async (req, res) => {
    try {
        let {oldPass, newPass, email} = req.body;
        let {id} = req.params;
        let student = await getStudentForAuth(email);
        student = student[0];
        
        const match = await bcrypt.compare(oldPass, student.password);
        
        if (match) {
            let passHash = await getPasswordHash(newPass);
            let x = await paraQuery(
                'UPDATE student SET password = ? WHERE id = ?;',
                [
                    passHash,
                    id,
                ],
            );
            res.status(200)
               .json({message: 'Password Changed Successfully.'});
        }
        else {
            res.status(400)
               .json({message: 'Password Changed Failed: Invalid Old Password.'});
        }
    } catch (error) {
        console.log(error);
        res.status(400)
           .json({message: 'Password Changed Failed: An error occurred. Please try again later.'});
    }
};


const getStudentObjById = async (id) => {
    try {
        let x = await paraQuery('SELECT * FROM student WHERE id=?', [id]);
        //console.log(x);
        return x[0];
    } catch (error) {
        console.log(error);
        return null;
    }
};
const getStudentForAuth = async (email) => {
    try {
        let x = await paraQuery('SELECT * FROM student WHERE email=?', [email]);
        // if (!x.length) {
        // 	return null;
        // }
        return x;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const addRefreshTokenToStudent = async (id, refreshToken) => {
    try {
        let x = await paraQuery(
            'UPDATE student SET refresh_token=? WHERE id=?',
            [refreshToken, id],
        );

        return x;
    } catch (error) {
        console.log(error);
        return null;
    }
};
const getStudentByToken = async (token) => {
    try {
        let x = await paraQuery('SELECT * FROM student WHERE refresh_token=?', [
            token,
        ]);
        // if (!x.length) {
        // 	return null;
        // }
        return x;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getCurrentSemester = async (session) => {
    const {current_session: currentSession} = await getSystemDetails();

    let ss = session.slice(0, 2);
    let sy = parseInt(session.slice(2, 5));
    let cs = currentSession.slice(0, 2);
    let cy = parseInt(currentSession.slice(2, 5));

    let currentSemester = (cy - sy) * 2;
    if (ss === cs) currentSemester++

    return currentSemester;
}
const resetStudentPassword = async (req, res) => {
    try {
        let {email} = req.body;
        let password = await getPasswordHash(process.env.DEFAULT_PASSWORD);

        let x = await paraQuery(
            'UPDATE student SET password = ? WHERE email = ?;',
            [
                password,
                email,
            ],
        );
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: true });
    }
};

module.exports = {
    getAllStudents,
    getStudentById,
    getStudentObjById,
    getStudentForAuth,
    getStudentByToken,
    addRefreshTokenToStudent,
    createNewStudent,
    updateStudent,
    updateStudentPassword,
    deleteStudent,
    getCurrentSemester,
    resetStudentPassword,
};
