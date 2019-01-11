var router = require('express').Router()
var urlShortener = require('./urlModel')

router.get("/:url_id", async (req, res) => {
    var currentURL = await urlShortener.where('short_url', req.params.url_id)
    if (currentURL.length > 0) {
        return res.redirect(`${currentURL[0].original_url}`)
    } else {
        var context = {
            error: `No ShortURL Exists for ${req.params.url_id}`
        }
        return res.status(404).json(context)
    }
})

router.post("/new", async (req, res) => {
    var newURLShortedOptions = {
        short_url: 0,
        original_url: req.body.link
    }
    var newURL = new urlShortener(newURLShortedOptions)
    var existingUrl = await urlShortener.where('original_url', req.body.link)

    if (existingUrl.length > 0) {
        var currentURL = {
            short_url: existingUrl[0].short_url,
            original_url: existingUrl[0].original_url
        }
        return res.status(200).json(currentURL)
    } else {
        var sortOptions = {
            field: 'asc',
            _id: -1
        }
        var lastRecord = await urlShortener.findOne().sort(sortOptions).limit(1)

        if (lastRecord != null) {
            newURL.short_url = lastRecord.short_url + 1
        }

        var outcome = await newURL.save()
        var currentURL = {
            short_url: outcome.short_url,
            original_url: outcome.original_url
        }
        return res.status(201).json(currentURL)
    }
})

module.exports = router