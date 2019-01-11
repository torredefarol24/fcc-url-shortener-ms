var express = require('express')
var app = express()
var mongoose = require('mongoose')
var app_port = process.env.PORT || 3000
var cors = require('cors')
var bodyParser = require('body-parser')
var mongooseConnectionUrl = require('./mongoConnection')
var urlController = require('./urlController')

app.use(cors())

app.use(express.static("assets"))

app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect(mongooseConnectionUrl).then(() => console.log("Mongo Connection Successfull")).catch(err => console.error(err))

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/index.html")
})

app.use('/api/shorturl', urlController)

var listenerCallback = () => console.log(`Listening on ${app_port}`)
app.listen(app_port, listenerCallback)