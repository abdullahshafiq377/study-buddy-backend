const paraQuery = require('../utils/db');
const mysql = require("mysql2/promise");

const getAllPosts = async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        await connection.execute('CREATE TEMPORARY TABLE IF NOT EXISTS student_posts AS (SELECT post.id, title, description, is_question, tags,likes,dislikes,date_time, author_id, name AS author_name, author_type FROM post INNER JOIN student where author_id = student.id);', []);
        await connection.execute('CREATE TEMPORARY TABLE IF NOT EXISTS instructor_posts AS (SELECT post.id, title, description, is_question, tags,likes,dislikes,date_time, author_id, name AS author_name, author_type FROM post INNER JOIN instructor where author_id = instructor.id);', []);

        const [rows, fields] = await connection.execute('SELECT * FROM student_posts UNION SELECT * FROM instructor_posts;', []);

        connection.end();

        console.log(rows);
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const getPostsByUser = async (req, res) => {
    try {
        let {userId} = req.params;

        let x = await paraQuery('SELECT * FROM post WHERE author_id=?', [userId]);
        console.log(x);
        res.json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const getCommentsByPost = async (req, res) => {
    let {postId} = req.params;

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        await connection.execute('CREATE TEMPORARY TABLE IF NOT EXISTS filtered_comments AS (SELECT * FROM comment WHERE post_id = ?);', [postId]);
        await connection.execute('CREATE TEMPORARY TABLE IF NOT EXISTS student_comments AS (SELECT filtered_comments.id,text,date_time,is_hidden,likes,dislikes,post_id,author_id, name as author_name FROM filtered_comments INNER JOIN student where author_id = student.id);', []);
        await connection.execute('CREATE TEMPORARY TABLE IF NOT EXISTS instructor_comments AS (SELECT filtered_comments.id,text,date_time,is_hidden,likes,dislikes,post_id,author_id, name as author_name FROM filtered_comments INNER JOIN instructor where author_id = instructor.id);', []);

        const [rows, fields] = await connection.execute('SELECT * FROM student_comments UNION SELECT * FROM instructor_comments;', []);

        connection.end();

        console.log(rows);
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const createPost = async (req, res) => {
    try {
        let {authorId, authorType, isQuestion, title, description, tags, dateTime} = req.body;

        let x = await paraQuery(
            'INSERT INTO post (author_id, author_type, is_question, title, description, tags, date_time) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [authorId, authorType, isQuestion, title, description, tags, dateTime],
        );
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const createComment = async (req, res) => {
    let {postId} = req.params;
    try {
        let {authorId, text, dateTime} = req.body;

        let x = await paraQuery(
            'INSERT INTO comment (author_id, text, date_time, post_id) VALUES (?, ?, ?, ?)',
            [authorId, text, dateTime, postId],
        );
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const deletePost = async (req, res) => {
    try {
        let {id} = req.params;

        let x = await paraQuery('DELETE FROM post WHERE id=?', [id]);
        console.log(x);
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const deleteComment = async (req, res) => {
    try {
        let {id} = req.params;

        let x = await paraQuery('DELETE FROM comment WHERE id=?', [id]);
        console.log(x);
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const deleteCommentsByPost = async (req, res) => {
    try {
        let {postId} = req.params;

        let x = await paraQuery('DELETE FROM comment WHERE post_id=?', [postId]);
        console.log(x);
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

const updatePost = async (req, res) => {
    try {
        let {isQuestion, title, description, tags} = req.body;
        let {id} = req.params;

        let x = await paraQuery(
            'UPDATE post SET  is_question=?, title=?, description=?, tags=? WHERE id=?',
            [isQuestion, title, description, tags, id],
        );
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};
const addReactions = async (req, res) => {
    try {
        let {id} = req.params;
        const {reactions} = req.body;
        const {likes, dislikes} = reactions;
        console.log(id);
        console.log(likes);
        console.log(dislikes);

        let x = await paraQuery(
            'UPDATE post SET  likes=?, dislikes=? WHERE id=?',
            [likes, dislikes, id],
        );
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true});
    }
};

module.exports = {
    getAllPosts,
    getPostsByUser,
    getCommentsByPost,
    createPost,
    createComment,
    updatePost,
    deletePost,
    deleteComment,
    deleteCommentsByPost,
    addReactions,
};
