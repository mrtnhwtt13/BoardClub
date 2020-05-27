const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')


// register a new user
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


// allow an user to connect
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


// delete an existing user
router.route('/delete')
    .post(
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            if (req.user.isAdmin === true) {
                User.findOneAndRemove({_id: req.body.userId}, req.body)
                    .then(res.json("Ok"))
                    .catch(err => console.log(err))
            }
            else {
                errors = 'Unauthorized';
                return res.status(404).json(errors);
            }
        }    
    )


// ban an user
router.route('/ban')
    .post(
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            if (req.user.isAdmin === true) {
                User.findOneAndUpdate({
                    _id: req.body.userId                    
                }, {
                    isBanned: req.body.ban
                }, {new: true})
                    .then(User => res.json(User))
                    .catch(err => console.log(err))
            }                
            else {
                errors = 'Unauthorized';
                return res.status(404).json(errors);
            }
        }    
    )


// get all users sorted by login
router.route('/all')
    .get((req, res) => {
        User.find()
            .sort({ login: 1 })
            .then(users => res.json(users))
            .catch(err => console.log(err))
    })


// follow another user
router.route('/follow')
    .post(
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            User.findOneAndUpdate({
                _id: req.user._id
            }, {
                $push: { following: req.body.userId}
            },
            { new: true})
            .then(user => {
                User.findOneAndUpdate({
                    _id: req.body.userId
                }, {
                    $push: { followers: req.user.id }
                }, { new: true })
                .then(user => res.json({ userId: req.body.userId }))
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }
    )


// unfollow another user
router.route('/unfollow')
    .post(
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            User.findOneAndUpdate({
                _id: req.user.id
            }, {
                $pull: { following: req.body.userId }
            },
            { new: true})
            .then(user => {
                User.findOneAndUpdate({
                    _id: req.body.userId
                }, {
                    $pull: { followers: req.user.id }
                }, { new: true })
                .then(user => res.json({ userId: req.body.userId }))
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }
    )


// get all the users followed by the current user
router.route('/following')
    .get(
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            User.find({ _id: { $in: req.user.following }
            })
            .sort({ login: 1 })
            .then(users => res.json(users))
            .catch(err => console.log(err))
    })


// get user id with name or email
router.route('/search')
	.post((req, res) => {
		User.findOne({
			$or: [
				{email: req.body.text},
				{login: req.body.text}
			]
		})
		.then(user => res.json({ userId: user._id }))
		.catch(err => res.status(404).json({ msg: 'User not found'}))
    })


// get infos from one user with user id
router.route('/find/:id')
    .get((req, res) => {
        User.findById(req.params.id)
            .then(user => {
                if (user) {
                    return res.json(user)
                }
                else {
                    return res.status(404).json({ msg: 'User not found'})
                }
            })
            .catch(err => console.log(err))                
    })


// edit user infos from admin section
router.route('/edit')
    .post(
        passport.authenticate('jwt', { session: false }), (req, res) => {
        const { isValid, errors } = validateRegisterInput(req.body);

        if (!isValid) {
            return res.status(404).json(errors);
        }

        User.findOne({ login: req.body.login })
            .then(user => {
                if (user && user.login !== req.body.oldLogin) {
                    errors.login = 'Login already used !'
                    return res.status(404).json(errors);
                }

                User.findOne({ email: req.body.email })
                    .then(user => {
                        if (user && user.email !== req.body.oldEmail) {
                            errors.email = 'Email already used !'
                            return res.status(404).json(errors);
                        }

                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(req.body.password, salt, function(err, hash) {
                                User.findOneAndUpdate({
                                    _id: req.body._id
                                }, {
                                    login: req.body.login,
                                    email: req.body.email,
                                    password: hash

                                },
                                { new: true })
                                .then(User => res.json(User))
                                .catch(err => console.log(err))
                            })                
                        })
                })
            })
    })


// edit profile login infos
router.route('/editprofile')
    .post(
        passport.authenticate('jwt', { session: false }), (req, res) => {
        const { isValid, errors } = validateRegisterInput(req.body);

        if (!isValid) {
            return res.status(404).json(errors);
        }

        User.findOne({ login: req.body.login })
            .then(user => {
                if (user && user.login !== req.body.oldLogin) {
                    errors.login = 'Login already used !'
                    return res.status(404).json(errors);
                }

                User.findOne({ email: req.body.email })
                    .then(user => {
                        if (user && user.email !== req.body.oldEmail) {
                            errors.email = 'Email already used !'
                            return res.status(404).json(errors);
                        }
                            User.findOne({ _id: req.user._id })
                            .then(user => {
                                bcrypt.compare(req.body.oldPassword, user.password)
                                .then(isMatch => {
                                    if (isMatch === false) {
                                        errors.oldPassword = 'Password is incorrect';
                                        return res.status(404).json(errors);
                                    }
                                })
                            })

                            bcrypt.genSalt(10, function (err, salt) {
                                bcrypt.hash(req.body.password, salt, function(err, hash) {
                                    User.findOneAndUpdate({
                                        _id: req.body._id
                                    }, {
                                        login: req.body.login,
                                        email: req.body.email,
                                        password: hash,
                                        city: req.body.city,
                                        avatar: req.body.avatar
                                    },
                                    { new: true })
                                    .then(User => res.json(User))
                                    .catch(err => console.log(err))
                                })                
                            })
                })
            })
    })


// get the informations of the current user
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
            isBanned: req.user.isBanned,
            city: req.user.city,
            avatar: req.user.avatar
        })
    })

    
module.exports = router;