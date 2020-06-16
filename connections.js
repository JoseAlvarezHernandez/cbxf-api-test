/**
 * @module connections
 * @author Jose de Jesus Alvarez Hernandez
 * @desc Mongoose connections module
 */

/** Mongoose dependency */
const mongoose = require('mongoose');
/** Environment configurations */
const dbConnections = require('./configs/dbConnections');

/** MongoDB Students connection chain  */
const StudentsConnectionChain = dbConnections.Students;

/** Mongoose promises configuration  */
mongoose.Promise = global.Promise;

module.exports = {
  StudentsConnectionChain: mongoose.createConnection(StudentsConnectionChain, { autoIndex: false })
};