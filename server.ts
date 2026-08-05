

import express from 'express';
import {Application} from "express";
import {getAllCourses} from './server/get-courses.route';
import {saveCourse} from './server/save-course.route';
const cors = require('cors');

const bodyParser = require('body-parser');

const app: Application = express();

app.use(cors({origin: true}));
app.use(bodyParser.json());

app.route('/api/courses').get(getAllCourses);

app.route('/api/courses/:id').put(saveCourse);



const port = process.env.PORT ? Number(process.env.PORT) : 9001;

const httpServer = app.listen(port)
    .on('error', (err: NodeJS.ErrnoException) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`Port ${port} is already in use. Stop the other process or set a different PORT environment variable.`);
            process.exit(1);
        }
        throw err;
    })
    .on('listening', () => {
        console.log(`HTTP REST API Server running at http://localhost:${port}`);
    });



