const {Player,Game} = require('../models/players.model')

const getAll = (req,res) => {
	Player.find({})
	.then(r=>res.json(r))
	.catch(e=>res.status(400).json(e))
}
const createOne = (req,res) => {
	Player.create(req.body)
	.then(r=>{
		Game.insertMany([{game:1},{game:2},{game:3}])
		.then(resp=>{
			console.log(r._id)
			console.log(resp)
			Player.findOneAndUpdate(
				{_id:r._id},
				{$push:{gameStatus:{$each: resp}}},{new:true}).exec()
			res.json(r)
		})
		.catch(err=>console.log(err))
		
	})
	.catch(e=>res.status(400).json(e))

}
const getOne = (req,res) => {
	Player.findOne({_id:req.body.id})
	.then(r=>res.json(r))
	.catch(e=>res.status(400).json(e))
}
const deleteOne = (req,res) => {
	Player.deleteOne({_id:req.params.id})
	.then(r=>res.json(r))
	.catch(e=>res.status(400).json(e))
}

const updateOne = (req,res) => {
	Player.findOneAndUpdate({"_id": req.params.pid,"gameStatus._id":req.params.sid},
		{$set: {"gameStatus.$.status":req.params.status}}, {new:true}).exec()
	.then(r=>res.json(r)).catch(e=>res.status(400).json(e))	
	
	
}

module.exports = {
	getAll,
	createOne,
	getOne,
	deleteOne,
	updateOne
}




/*
module.exports.updatePlayerStatus = (request, response) => {
    const {game, status} = request.body
    Player.findOneAndUpdate({"_id": request.params.id, "status.id": game},
    {$set: {'status.$.activity': status}}, {new:true})
    .then(player => response.json(player))
    .catch(err=> response.json(err))
}

*/