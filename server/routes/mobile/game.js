const router = require("express").Router();
const Game = require("../../models/Game");


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

// join a game
router.route('/join')
    .post((req, res) => {
            Game.findOneAndUpdate({
                _id: req.body.gameId
            }, {
                $push: { players: req.body.userId}
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
    .post((req, res) => {
            Game.findOneAndUpdate({
                _id: req.body.gameId
            }, {
                $pull: { players: req.body.userId}
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

    module.exports = router;