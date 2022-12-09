const Router = require('express').Router()
const UserRouter = require('./UserRouter')
const CatRouter = require('./CatRouter')
//const TriggerRouter = require('./TriggerRouter')
Router.use('/', UserRouter)
Router.use('/cats', CatRouter)
//Router.use('/triggers', TriggerRouter)
module.exports = Router