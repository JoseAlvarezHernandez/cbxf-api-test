/**
 * @module models/Student
 * @author Jose de Jesus Alvarez Hernandez
 * @desc API Students model
 */

/** Mongoose connections */
const connections = require('../connections');
/** Mongoose dependency */
const mongoose = require('mongoose');
/** Mongoose schema object */
let Schema = mongoose.Schema;

const Student = {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: {
        type: String
        , enum: ['Hombre', 'Mujer']
        , required: true
    },
    birthDate: { type: Date, required: true },
    deleted: { type: Boolean, default: false },
    profilePicture: { data: Buffer, contentType: String }
};

/** Additional configurations */
const configs = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
};

/** Student schema object*/
var StudentSchema = new Schema(Student, configs);

/** Student model instance */
module.exports = connections.StudentsConnectionChain.model('Student', StudentSchema, 'Students');