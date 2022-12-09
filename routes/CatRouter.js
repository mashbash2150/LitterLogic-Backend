const Router = require('express').Router()
const controller = require('../controllers/CatController')

Router.get('/:user_id', controller.getOwnerCats)
Router.post('/create/:user_id', controller.createCat)

module.exports = Router
