const express = require('express');
const router = express.Router();

const { addStudent,
     getAllStudents, 
    getStudentById, 
    updateStudent,
    deleteStudent
    } = require('../controller/students');

router.post('/students', addStudent);
router.get('/students', getAllStudents);
router.get('/student/:id', getStudentById);
router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);

module.exports = router;