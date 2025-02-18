const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    empId: {
        type: String,
        required: true,
        unique: true
    },
    empDept: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Employee', EmployeeSchema); 
