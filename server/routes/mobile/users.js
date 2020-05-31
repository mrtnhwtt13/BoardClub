const router = require("express").Router();
const User = require('../../models/User');
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')
const bcrypt = require('bcryptjs');


router.route('/login')
.post((req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)
    if (!isValid) {
        return res.status(404).json(errors)
    }
    User.findOne({ login: req.body.login })
            .then(user => {
                if (user) {
                    bcrypt.compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            if (user.isBanned === true) {
                                errors.login = 'User is banned';
                                return res.status(404).json(errors);
                            }
                            return res.json({
                                user
                            })
                        }
                        else {
                            errors.password = 'Password is incorrect';
                            return res.status(404).json(errors);
                        }
                    })
                }
                else {
                    errors.login = 'User not found';
                    return res.status(404).json(errors);
                }               
            })
})
module.exports = router;