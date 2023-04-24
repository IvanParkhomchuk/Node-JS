const Task = require('../models/task');

const handleError = (res, error) => {
    res.send(error.message);
}

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch(err) {
        handleError(res, err);
    }
};
const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).json(task);
    } catch(err) {
        handleError(res, err);
    }
};
const addTask = async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).json(task);
    } catch(err) {
        handleError(res, err);
    }
};
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            res.status(404).json();
        } else {
            res.status(200).json(task);
        }
    } catch(err) {
        handleError(res, err);
    }
};
const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body);

        if (!task) {
            res.status(404).json();
        } else {
            res.status(200).json(task);
        }
    } catch(err) {
        handleError(res, err);
    }
};


module.exports = {
    getTasks,
    getTask,
    addTask,
    deleteTask,
    updateTask
};
