const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollnumber: { type: String, required: true}, // Ensure it's unique
    course: { type: String, required: true },
    year: { type: String, required: true },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
