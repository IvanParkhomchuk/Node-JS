const express = require('express');
const {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser
} = require('../../controllers/user-controller');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', addUser);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id', updateUser);

module.exports = router;
