var mongoose = require('mongoose')
var urlSchemaOptions = {
    short_url: Number,
    original_url: String
}
var urlSchema = new mongoose.Schema(urlSchemaOptions)
var urlmodel = mongoose.model('urlShortener', urlSchema)

module.exports = urlmodel