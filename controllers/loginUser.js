const User = require('../models/User.js');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const {username, password} = req.body;

    User.findOne({username: username}, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id;
                    res.redirect('/');
                    return;
                }

                res.redirect('/auth/login');
            });

            return;
        }

        res.redirect('/auth/login');
    });
};