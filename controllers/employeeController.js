const Employee = require('../models/employee');

exports.getIndex = (req, res) => {
    res.render('index');
};

exports.getView = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.render('view', { employees, title: 'View All' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.postCreate = async (req, res) => {
    try {
        await Employee.create(req.body);
        res.redirect('/view');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getUpdate = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        res.render('update', { employee });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.postUpdate = async (req, res) => {
    try {
        await Employee.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/view');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getDelete = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.render('delete');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
