const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')


router.route('/register')
    .post((req, res) => {
        const { isValid, errors } = validateRegisterInput(req.body);

        if (!isValid) {
            return res.status(404).json(errors);
        }

        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    errors.email = 'Email already used !'
                    return res.status(404).json(errors);
                }

                User.findOne({ login: req.body.login })
                    .then(user => {
                        if (user) {
                            errors.login = 'Login already used !'
                            return res.status(404).json(errors);
                        }

                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(req.body.password, salt, function(err, hash) {
                                const newUser = new User({
                                    email: req.body.email,
                                    login: req.body.login,
                                    password: hash
                                })

                                newUser.save()
                                    .then(newUser => res.json(newUser))
                                    .catch(err => console.log(err))
                            })                
                        })
                })
            })
    })


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
                            const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1d' }, function (err, token) {
                                return res.json({
                                    success: true,
                                    token: token
                                })
                            });
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


router.route('/')
    .get( passport.authenticate('jwt', { session: false }),(req, res) => {
        res.json({
            _id: req.user._id,
            login: req.user.login,
            email: req.user.email,            
            followers: req.user.followers,
            following: req.user.following,
            topGames: req.user.topGames,
            blockedUsers: req.user.blockedUsers,
            isAdmin: req.user.isAdmin,
            isBanned: req.user.isBanned
        })
    })

    
module.exports = router;