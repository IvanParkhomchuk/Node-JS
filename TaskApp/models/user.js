const mongoose = require('mongoose');
const validator = require("validator");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (value.length < 7) {
                throw new Error("Password must contain more than 6 characters");
            } else if (value === 'password') {
                throw new Error("password cannot be 'password'");
            }
        }
    },
    age: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be a positive number");
            }
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
