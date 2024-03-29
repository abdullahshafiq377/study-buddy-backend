// Import Statments
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const verifyJWT = require('./src/middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const socketServer = require('./socketServer');

// Router Imports
const indexRouter = require('./src/routes/index');
const studentRouter = require('./src/routes/api/students');
const instructorRouter = require('./src/routes/api/instructors');
const subAdminRouter = require('./src/routes/api/subAdmins');
const departmentRouter = require('./src/routes/api/departments');
const programRouter = require('./src/routes/api/programs');
const courseRouter = require('./src/routes/api/courses');
const noticeRouter = require('./src/routes/api/notices');
const eventRouter = require('./src/routes/api/events');
const alertRouter = require('./src/routes/api/alerts');
const registrationRouter = require('./src/routes/api/registrations');
const postRouter = require('./src/routes/api/posts');
const sectionRouter = require('./src/routes/api/sections');
const assignmentRouter = require('./src/routes/api/assignment');
const quizRouter = require('./src/routes/api/quizzes');
const attendanceRouter = require('./src/routes/api/attendance');
const learningResourceRouter = require('./src/routes/api/learningResources');
const gradeRouter = require('./src/routes/api/grades');
const resultRouter = require('./src/routes/api/results');
const fileRouter = require('./src/routes/api/files');

// Auth Router Imports
const authRouter = require('./src/routes/auth');
const refreshRouter = require('./src/routes/refresh');
const logoutRouter = require('./src/routes/logout');

// Enviornmental Variables
require('dotenv/config');
const http = require('http');
const api = process.env.API_URL;

// Middlewares

app.use(morgan('tiny'));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(fileUpload());
// Auth Routers
app.use(`${api}/auth`, authRouter);
app.use(`${api}/refresh`, refreshRouter);
app.use(`${api}/logout`, logoutRouter);

// Routers
app.use(`${api}/`, indexRouter);

// app.use(verifyJWT);
app.use(`${api}/students`, studentRouter);
app.use(`${api}/instructors`, instructorRouter);
app.use(`${api}/sub-admins`, subAdminRouter);
app.use(`${api}/departments`, departmentRouter);
app.use(`${api}/programs`, programRouter);
app.use(`${api}/courses`, courseRouter);
app.use(`${api}/notices`, noticeRouter);
app.use(`${api}/events`, eventRouter);
app.use(`${api}/alerts`, alertRouter);
app.use(`${api}/registrations`, registrationRouter);
app.use(`${api}/posts`, postRouter);
app.use(`${api}/sections`, sectionRouter);
app.use(`${api}/assignments`, assignmentRouter);
app.use(`${api}/quizzes`, quizRouter);
app.use(`${api}/attendance`, attendanceRouter);
app.use(`${api}/learning-resources`, learningResourceRouter);
app.use(`${api}/grades`, gradeRouter);
app.use(`${api}/results`, resultRouter);
app.use(`${api}/files`, fileRouter);


// Express Server

const server = http.createServer(app);
socketServer.registerSocketServer(server);
const serverPort = 8000;

server.listen(serverPort, () => {
	console.log(`Server is running on http://localhost:${serverPort}`);
});
