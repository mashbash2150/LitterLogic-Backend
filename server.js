const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const routes=require("./routes")
const mongoose=require('mongoose')

const db=require('./db')

const PORT = process.env.PORT || 3001


const app = express()


app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api',routes);


////app.use(express.static(`${__dirname}/client/build`))

//app.get('/*', (req, res) => {
  //res.sendFile(`${__dirname}/client/build/index.html`)
 //})

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})
