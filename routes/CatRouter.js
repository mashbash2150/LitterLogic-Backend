const Router = require('express').Router()
const controller = require('../controllers/CatController')



Router.get('/', controller.getAllCats)
Router.get('/:user_id', controller.getOwnerCats)
Router.post('/create/:user_id', controller.createCat)
Router.put('/:cat_id',controller.updateCat)
Router.delete('/:cat_id',controller.deleteCat)

module.exports = Router
