const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require('bcrypt');

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
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email address');
            }
        },
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// Перед збереженням хешуємо пароль
UserSchema.pre('save', async function (next) {
    // Отримуємо екземпляр даного користувача
    const user = this;

    // Якщо модифікується пароль
    if (user.isModified('password')) {
        // Зашифруємо його
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
