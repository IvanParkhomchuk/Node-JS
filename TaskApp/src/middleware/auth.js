const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace("Bearer ", "");
        const decoded = jwt.verify(token, 'kdweueksdsjfij');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if(!user) {
            throw new Error();
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(403).send({ error: "Please authenticate." });
    }
};

module.exports = auth;
