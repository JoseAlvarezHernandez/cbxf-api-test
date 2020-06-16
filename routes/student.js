/** 
 * @module routes/students 
 * @author Jose de Jesus Alvarez Hernandez
 * @desc Student API routes  
 */

/** Express dependency */
const express = require('express');

/** Router dependency */
const router = express.Router();

/** Route for API */
const route = '/api/student';

const students = require('../controllers/student');

router.get(route, students.getAllStudents);
router.get(`${route}/:studentId`, students.getStudent);
router.post(route, students.addStudent);
router.put(`${route}/:studentId`, students.updateStudent);
router.delete(`${route}/:studentId`, students.deleteStudent);

module.exports = router