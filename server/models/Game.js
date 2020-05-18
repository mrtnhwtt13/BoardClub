const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema
const gameSchema = new Schema({
    userId: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    gameDate: {
        type: Date,
        required: true
    },
    boardGameId: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    playersLevel: {
        type: String,
        required: true
    },
    playersNumber: {
        type: Number,
        default: 1
    },
    playersMax: {
        type: Number,
        required: true
    },
    players: [],
    creationDate: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("Game", gameSchema);