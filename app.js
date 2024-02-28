const express = require('express');
const connection = require("./connection");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const employeeController = require('./controllers/employeeController');
const hbs = require('hbs');
const path = require('path'); 
const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.__express);
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

hbs.registerHelper('eq', function (a, b) {
    return a === b;
});

hbs.registerHelper('formatDate', function(passedDate) {  
    return passedDate.toISOString().split('T')[0];   
  });
  

// Defines employee schema
const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    department: String,
    startDate: Date,
    jobTitle: String,
    salary: Number
});

// Check if the Employee model is already defined
const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);

// Set up middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Creates a new employee document with data from the form
app.post('/view', async (req, res) => {
    try {
        const newEmployee = new Employee({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            department: req.body.department,
            startDate: req.body.startDate,
            jobTitle: req.body.jobTitle,
            salary: req.body.salary
        });
        //Saves the new employee document to the database
        await newEmployee.save();

        res.redirect('/view'); //Redirect to view page after successful submission
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route handler for the home page
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/view', employeeController.getView);

//Update employee
app.post('/update/:id', employeeController.postUpdate);
app.get('/update/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        //res.render('update', { employee });
        res.render('update', {employee, title: 'Update Employee'});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Delete employee
app.get('/delete/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        res.render('delete', { employee, title: 'Delete Employee' }); //Pass employee data to the delete page
    } catch (error) {
        res.status(500).send(error.message); 
    }
});
app.post('/delete/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.redirect('/view'); // Redirect to view page after successful deletion
    } catch (error) {
        res.status(500).send(error.message); 
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});












/* const express = require("express");
// const moment = require("moment");
const connection = require("./connection");
// const postModel = require("./models/postModel.js");
const employeeController = require('./controllers/employeeController');
const hbs = require('express-hbs');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials'
  }));
  
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


//Creates a new employee document with data from the form
app.post('/index.hbs', async (req, res) => {
  try {
      const newEmployee = new Employee({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          department: req.body.department,
          startDate: req.body.startDate,
          jobTitle: req.body.jobTitle,
          salary: req.body.salary
      });
      //Saves the new employee document to the database
      await newEmployee.save();

      res.redirect('/index.hbs'); //Redirect to view page after successful submission
  } catch (error) {
      res.status(500).send(error.message);
  }
});


// Route handler for the home page
app.get("/", async (req, res) => {
  try {
    //const empls = await postModel.find();
      res.render("index.hbs", {
        //data: JSON.parse(JSON.stringify(empls)),
        title: "Veiw Employees"
      });
  } catch (e) {
    console.log(e);
  }
});
app.get('/index.hbs', employeeController.getView);

//update
app.post('/update/:id', employeeController.postUpdate);
app.get('/update/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        res.render('update', {data: employee, title: 'Update Employee'});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//delete
app.get('/delete/:id', async (req, res) => {
  try {
      const employee = await Employee.findById(req.params.id);
      res.render('delete', { employee, title: 'Delete Employee' });
  } catch (error) {
      res.status(500).send(error.message); 
  }
});
app.post('/delete/:id', async (req, res) => {
  try {
      await Employee.findByIdAndDelete(req.params.id);
      res.redirect('/index.hbs');
  } catch (error) {
      res.status(500).send(error.message); 
  }
});



app.listen(3000, () => {
  console.log("Listening at port 3000");
}); */