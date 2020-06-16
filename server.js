/**
 * @module server
 * @author Jose de Jesus Alvarez Hernandez
 * @desc Node JS server.js
 */

/** Express instance */
const express = require('express');

/** Path instance */
const path = require('path');

/** URL instance */
const url = require('url');

/** bodyParser instance */
const bodyParser = require('body-parser');

/** Express Router instance */
const router = express.Router();

/** Express object */
const app = express();

/** Node app port */
const port = process.env.port || process.env.PORT || 3978;

/** App Access Control configurations */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({
    extended: true,
    limit: 1024 * 1024 * 5,
    type: 'application/x-www-form-urlencoding',
}));

app.use(bodyParser.json({
    limit: 1024 * 1024,
    type: 'application/json',
}));

/************************************************
* Import routes
************************************************/

const studentRoute = require('./routes/student')

// Init get
router.get('/', (req, res) => res.status(200).send({ status: 'up' }));

/************************************************
* Use routes
************************************************/

app.use(router);
app.use(studentRoute);

app.use((req, res, next) => res.status(404).send({ error: 'Method Not Allowed' }));

app.listen(port, () => console.log(`Your Server is up at port: ${port}`));