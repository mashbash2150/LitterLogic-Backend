const Router = require('express').Router()
const controller = require('../controllers/TriggerController')


Router.post('/create/:cat_id', controller.createTrigger)
Router.get('/:cat_id', controller.getCatTriggers)
Router.get('/actions/:trigger_id', controller.getTriggerById)
Router.put('/actions/:trigger_id', controller.updateTrigger)
Router.delete('/actions/:trigger_id', controller.deleteTrigger)




module.exports = Router