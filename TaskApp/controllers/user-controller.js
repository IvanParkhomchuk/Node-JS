const User = require('../models/user');

const handleError = (res, error) => {
    res.status(500).json({ error });
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch(err) {
        handleError(res, err);
    }
};
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch(err) {
        handleError(res, err);
    }
};
const addUser = async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).json(user);
    } catch(err) {
        handleError(res, err);
    }
};
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            res.status(404).json();
        } else {
            res.status(200).json(user);
        }
    } catch(err) {
        handleError(res, err);
    }
};
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);

        if (!user) {
            res.status(404).json();
        } else {
            res.status(200).json(user);
        }
    } catch(err) {
        handleError(res, err);
    }
};

module.exports = {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser
};
