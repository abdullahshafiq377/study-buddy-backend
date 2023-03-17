// Import Statments
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const verifyJWT = require('./src/middleware/verifyJWT');
const cookieParser = require('cookie-parser');

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

// Auth Router Imports
const authRouter = require('./src/routes/auth');
const refreshRouter = require('./src/routes/refresh');
const logoutRouter = require('./src/routes/logout');

// Enviornmental Variables
require('dotenv/config');
const api = process.env.API_URL;

// Middlewares

app.use(morgan('tiny'));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(bodyParser.json());

// Auth Routers
app.use(`${api}/auth`, authRouter);
app.use(`${api}/refresh`, refreshRouter);
app.use(`${api}/logout`, logoutRouter);

// Routers
app.use(`${api}/`, indexRouter);

//app.use(verifyJWT);
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


// Express Server
const serverPort = 8000;

app.listen(serverPort, () => {
	console.log(`Server is running on http://localhost:${serverPort}`);
});
