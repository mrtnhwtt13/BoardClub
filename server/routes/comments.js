const router = require("express").Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Comment = require("../models/Comment");
const User = require("../models/User");


// post a new comment
router.route('/add')
    .post(
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            const text = req.body.text.trim()
            
            const newComment = new Comment({
                user: {
                    id: req.user.id,
                    login: req.user.login
                },
                text,
                gameId: req.body.gameId
            })

            newComment.save()
                .then(comment => res.json(comment))
                .catch(err => console.log(err))
        }    
    )


// delete a comment
router.route('/delete')
    .post(
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            Comment.findOneAndRemove({_id: req.body.commentId, "user.id": req.user.id}, req.body)
                .then(res.json("Ok"))
                .catch(err => console.log(err))
        }    
    )


// edit a comment
router.route('/edit')
    .post(
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            Comment.findOneAndUpdate({_id: req.body.commentId, "user.id": req.user.id}, {text: req.body.text}, {new: true})
                .then(commment => res.json(comment))
                .catch(err => console.log(err))
        }    
    )


// get all comments
router.route('/')
    .get((req, res) => {
        Comment.find()
            .sort({ createdAt: -1 })
            .then(comments => res.json(comments))
            .catch(err => console.log(err))
    })


// find a comment
router.route('/find')
    .get((req, res) => {
        Comment.findById(req.body.commentId)
            .then(comment => {
                if (comment) {
                    return res.json(comment)
                }
                else {
                    return res.status(404).json({ msg: 'Comment not found'})
                }
            })
            .catch(err => console.log(err))                
    })


// get all comments from one user
router.route('/user/:userId')
    .get((req, res) => {
        Comment.find({ 'user.id': req.params.userId })
            .sort({ createdAt : -1 })  
            .then(comments => res.json(comments))
            .catch(err => console.log(err))                
    })


// get all comments from one game
router.route('/game/:gameId')
    .get((req, res) => {
        Comment.find({ gameId: req.params.gameId })
            .sort({ createdAt : -1 })  
            .then(comments => res.json(comments))
            .catch(err => console.log(err))                
    })


module.exports = router;