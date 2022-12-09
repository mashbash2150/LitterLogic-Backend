const Router = require('express').Router()
const controller = require('../controllers/TriggerController')


Router.post('/create/:cat_id', controller.createTrigger)
Router.get('/:cat_id', controller.getCatTriggers)




module.exports = Router