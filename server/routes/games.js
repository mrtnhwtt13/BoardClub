const router = require("express").Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Game = require("../models/Game");
const User = require("../models/User");
const validateCreationInput = require('../validation/createGame')
const validateEditInput = require('../validation/editGame')


// create a new game
router.route('/create')
    .post(
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            const { isValid, errors } = validateCreationInput(req.body);
            if (!isValid) {
                return res.status(404).json(errors);
            }            
            
            const newGame = new Game({
                userId: req.user.id,
                title: req.body.title.trim(),
                description: req.body.description.trim(),
                gameDate: req.body.gameDate,
                boardGameId: req.body.boardGameId,
                boardGameName: req.body.boardGameName,
                city: req.body.city,
                playersLevel: req.body.playersLevel,
                players: [req.user.id],
                playersMax: req.body.playersMax
            })

            newGame.save()
                .then(game => res.json(game))
                .catch(err => console.log(err))
        }    
    )


// delete an existing game
router.route('/delete')
    .post(
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            Game.findOneAndRemove({_id: req.body.gameId, "userId": req.user.id}, req.body)
                .then(res.json("Ok"))
                .catch(err => console.log(err))
        }    
    )


// edit an existing game
router.route('/edit')
    .post(
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            const { isValid, errors } = validateEditInput(req.body);
            if (!isValid) {
                return res.status(404).json(errors);
            } 

            Game.findOneAndUpdate({
                _id: req.body.gameId
            }, {
                title: req.body.title.trim(),
                description: req.body.description.trim(),
                gameDate: req.body.gameDate,
                city: req.body.city,
                playersLevel: req.body.playersLevel,
                playersMax: req.body.playersMax
            }, {new: true})
                .then(game => res.json(game))
                .catch(err => console.log(err))
        }    
    )


// join a game
router.route('/join')
    .post(
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            Game.findOneAndUpdate({
                _id: req.body.gameId
            }, {
                $push: { players: req.user.id}
            },
            { new: true})
            .then(game1 => {
                Game.findOneAndUpdate({
                    _id: req.body.gameId
                }, {
                    playersNumber: (game1.playersNumber + 1)
                }, { new: true })
                .then(game2 => res.json({ players: game2.players }))
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }
    )


// leave a game
router.route('/leave')
    .post(
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            Game.findOneAndUpdate({
                _id: req.body.gameId
            }, {
                $pull: { players: req.user.id}
            },
            { new: true })
            .then(game1 => {
                Game.findOneAndUpdate({
                    _id: req.body.gameId
                }, {
                    playersNumber: (game1.playersNumber - 1)
                }, { new: true })
                .then(game2 => res.json({ players: game2.players }))
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }
    )


// get all the games joined by the current user
router.route('/scheduled')
    .get(
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            Game.find({
                players: req.user.id,
                gameDate: {$gte: new Date()}
            })
            .sort({ gameDate: 1 })
            .then(games => res.json(games))
            .catch(err => console.log(err))
    })


// search games
router.route('/search')
	.post((req, res) => {        

        User.find({ login: new RegExp(".*" + req.body.searchText + ".*", "i")})
            .then(users => 
                {   var userSearch = [];
                    users.forEach(element => {
                        userSearch.push(element.id)
                    });

                    var query;
                    if (req.body.searchTerm === "all") {
                        query = {
                            $or: [
                                {boardGameName: new RegExp(".*" + req.body.searchText + ".*", "i")},
                                {city: new RegExp(".*" + req.body.searchText + ".*", "i")},
                                {players: { $in: userSearch }}
                            ]
                        }
                    }
                    else if (req.body.searchTerm === "boardGameName") {
                        query = {
                            boardGameName: new RegExp(".*" + req.body.searchText + ".*", "i")
                            
                        }
                    }
                    else if (req.body.searchTerm === "city") {
                        query = {
                            city: new RegExp(".*" + req.body.searchText + ".*", "i")
                            
                        }
                    }
                    else if (req.body.searchTerm === "playerName") {
                        query = {
                            players: { $in: userSearch }                            
                        }
                    }

                    Game.find(query)
                        .sort({ gameDate: -1 })
		                .then(games => res.json(games))
                        .catch(err => res.status(404).json({ msg: 'Games not found'}))
                })
            .catch(err => console.log(err))
    })
    

// get all games sorted by game date desc
router.route('/')
    .get((req, res) => {
        Game.find()
            .sort({ gameDate: 1 })
            .then(games => res.json(games))
            .catch(err => console.log(err))
    })


// get all upcoming games sorted by game date
router.route('/upcoming')
    .get((req, res) => {
        Game.find({ gameDate: {$gte: new Date()}})
            .sort({ gameDate: 1 })
            .then(games => res.json(games))
            .catch(err => console.log(err))
    })


// get one game by game Id
router.route('/find/:gameId')
    .get((req, res) => {
        Game.findById(req.params.gameId)
            .then(game => {
                if (game) {
                    return res.json(game)
                }
                else {
                    return res.status(404).json({ message: 'Game not found'})
                }
            })
            .catch(err => console.log(err))                
    })


// get all games of an user by user Id (sorted by game date desc)
router.route('/user/:userId')
    .get((req, res) => {
        Game.find({ userId: req.params.userId })
            .sort({ gameDate : -1 })  
            .then(games => res.json(games))
            .catch(err => console.log(err))                
    })


module.exports = router;