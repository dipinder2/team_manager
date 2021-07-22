const playerController = require('../controllers/players.controller')

module.exports = app =>{
	app.get('/api/players', playerController.getAll)
	app.get('/api/players/:id', playerController.getOne)
	app.post('/api/players', playerController.createOne)
	app.delete('/api/players/:id', playerController.deleteOne)
	app.put('/api/players/status/:pid/:gid/:sid/:status', playerController.updateOne)
}