// Require mongoose module 
const mongoose = require('mongoose'); 

// Defining empl schema 
const empl = new mongoose.Schema( 
	{ 
    firstName: String, 
    lastName: String, 
    department: String, 
    salary: Number, 
    startDate: Date, 
    jobTitle: String,
  } 
) 

const Employee = mongoose.model('Employee', empl); 
module.exports = Employee;
/*Employee.createCollection().then(function (collection) { 
	console.log('Employee collection created'); 
});*/