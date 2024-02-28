const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    department: { type: String, enum: ['IT', 'Finance', 'Sales', 'Operations', 'Magnets'], required: true },
    startDate: { type: Date, required: true },
    jobTitle: { type: String, required: true },
    salary: { type: Number, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);