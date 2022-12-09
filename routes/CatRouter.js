const Router = require('express').Router()
const controller = require('../controllers/CatController')

Router.get('/cats', controller.getCats)

module.exports = Router
