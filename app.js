// Import Statments
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

// Router Imports
const indexRouter = require("./src/routes/index");
const studentRouter = require("./src/routes/students");
const instructorRouter = require("./src/routes/instructors");
const subAdminRouter = require("./src/routes/subAdmins");
const departmentRouter = require("./src/routes/departments");
const programRouter = require("./src/routes/programs");
const courseRouter = require("./src/routes/courses");
const noticeRouter = require("./src/routes/notices");
const eventRouter = require("./src/routes/events");
const alertRouter = require("./src/routes/alerts");

// Enviornmental Variables
require("dotenv/config");
const api = process.env.API_URL;

// Middlewares
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());
app.options("*", cors());

// Routers
app.use(`${api}/`, indexRouter);
app.use(`${api}/students`, studentRouter);
app.use(`${api}/instructors`, instructorRouter);
app.use(`${api}/sub-admins`, subAdminRouter);
app.use(`${api}/departments`, departmentRouter);
app.use(`${api}/programs`, programRouter);
app.use(`${api}/courses`, courseRouter);
app.use(`${api}/notices`, noticeRouter);
app.use(`${api}/events`, eventRouter);
app.use(`${api}/alerts`, alertRouter);

// Express Server
const serverPort = 8000;

app.listen(serverPort, () => {
  console.log(`Server is running on http://localhost:${serverPort}`);
});
