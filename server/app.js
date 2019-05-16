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

app.get('/', (request, response) => {
  response.status(200).send({ status: 200, message: 'Welcome to Quickcredit API Version 1' });
});
// app.get('/', (request, response) => {
//   response.status(500).send({ status: 500, message: 'Server error' });
// });
// routes which should handle endpoints
route(app);


const debug = Debug('http');
const PORT = process.env.PORT || 3000; // setup PORT to be used
app.listen(PORT, () => {
  debug(`Server is running on PORT ${PORT}`);
});

export default app;
