const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
  	game:Number,
  	status: {
        type: String,
        enum : ['undecided','not-playing','playing'],
        default: 'undecided'
    },

},{timestamps:true})


const PlayerSchema = new mongoose.Schema({
	name: {
		type:String,
		required:[true,"must give player name"],
		minLength:[3,"must be more than 3 characters"]
	},
	position: {
		type:String,
		required:[true,"must give position name"],
		minLength:[3,"must be more than 3 characters"]
	},
	gameStatus:[GameSchema]
},{timestamps:true});

module.exports.Player = mongoose.model('Player',PlayerSchema)
module.exports.Game = mongoose.model('Game',GameSchema)