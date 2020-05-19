const router = require("express").Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Game = require("../models/Game");
const validateCreationInput = require('../validation/createGame')


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
            const { isValid, errors } = validateCreationInput(req.body);
            if (!isValid) {
                return res.status(404).json(errors);
            } 

            Game.findOneAndUpdate({
                _id: req.body.gameId,
                "userId": req.user.id
            }, {
                title: req.body.title.trim(),
                description: req.body.description.trim(),
                gameDate: req.body.gameDate,
                boardGameId: req.body.boardGameId,
                city: req.body.city,
                playersLevel: req.body.playersLevel,
                playersMax: req.body.playersMax
            }, {new: true})
                .then(Game => res.json(Game))
                .catch(err => console.log(err))
        }    
    )

// get all games sorted by game date desc
router.route('/')
    .get((req, res) => {
        Game.find()
            .sort({ gameDate: -1 })
            .then(games => res.json(games))
            .catch(err => console.log(err))
    })

// get one game by game Id
router.route('/find')
    .get((req, res) => {
        Game.findById(req.body.gameId)
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
router.route('/:userId')
    .get((req, res) => {
        Game.find({ 'userId': req.params.userId })
            .sort({ gameDate : -1 })  
            .then(games => res.json(games))
            .catch(err => console.log(err))                
    })


module.exports = router;