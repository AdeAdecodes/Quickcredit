import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Debug from 'debug';
import dotenv from 'dotenv';
import route from './route/index';

dotenv.config();

// Set up the express app
const app = express();

app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// routes which should handle request
route(app);


const debug = Debug('http');
const PORT = process.env.PORT || 3000; // setup PORT to be used
app.listen(PORT, () => {
  debug(`Server is running on PORT ${PORT}`);
});

export default app;
