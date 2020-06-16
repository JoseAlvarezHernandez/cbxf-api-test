/**
 * @module controllers/students
 * @author Jose de Jesus Alvarez Hernandez
 * @desc students Controllers
 */

const messages = require('./../messages')
const APIstudentsCRUD = require('./../models/student')

const fields = ['id', 'name', 'age', 'gender', 'birthDate'];

const students = {
    getAllStudents,
    getStudent,
    addStudent,
    updateStudent,
    deleteStudent
}

async function getAllStudents(request, response, next) {
    const conditions = { deleted: { $ne: true } }
    try {
        const students = await APIstudentsCRUD.find(conditions, fields)
        if (students)
            response.status(200).send({ students })
        else
            response.status(400).send({ message: messages.studentNotFound })
    } catch (err) {
        response.status(409).send({ message: messages.studentNotFound })
    }
}

async function getStudent(request, response, next) {
    const { studentId } = request.params
    const conditions = { deleted: { $ne: true }, _id: studentId }
    try {
        const student = await APIstudentsCRUD.findOne(conditions, fields)
        if (student)
            response.status(200).send({ student })
        else
            response.status(400).send({ message: messages.studentNotFound })
    } catch (err) {
        response.status(409).send({ message: messages.studentNotFound })
    }
}

async function addStudent(request, response, next) {
    try {
        const newStudent = new APIstudentsCRUD({ ...request.body })
        const success = await newStudent.save()
        response.status(201).send({
            _id: success._id,
            name: success.name,
            age: success.age,
            gender: success.gender,
            birthDate: success.birthDate
        })
    } catch (err) {
        response.status(409).send({ ...err })
    }
}

async function updateStudent(request, response, next) {
    const { studentId } = request.params
    try {
        const student = await APIstudentsCRUD.updateOne({ _id: studentId }, { $set: { ...request.body } })
        response.status(201).send({ success: true })
    } catch (err) {
        response.status(409).send({ ...err })
    }
}

async function deleteStudent(request, response, next) {
    const { studentId } = request.params
    try {
        const student = await APIstudentsCRUD.updateOne({ _id: studentId }, { $set: { deleted: true } })
        response.status(201).send({ success: true })
    } catch (err) {
        response.status(409).send({ ...err })
    }
}


module.exports = students