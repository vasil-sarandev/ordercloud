var fs = require('fs')
const { isEmpty } = require('lodash')
const { uploadFileToS3 } = require('../lib/aws/s3')
const multiparty = require('multiparty')

const parseVenueData = async (req) => new Promise((resolve, reject) => {
    var form = new multiparty.Form()
    form.parse(req, async (err, fields, files) => {
        if (err) {
            reject(err)
        }
        const { logo, cover } = files
        const { name, slug, theme, logo: logoField, cover: coverField, enableOrders, announcement } = fields

        let logoURL, coverURL

        if (!isEmpty(logo)) {
            const logoBuffer = fs.readFileSync(logo[0].path)
            logoURL = await uploadFileToS3(logoBuffer, `logos/${slug[0]}_logo.png`)
        } else {
            logoURL = logoField[0]
        }

        if (!isEmpty(cover)) {
            const coverBuffer = fs.readFileSync(cover[0].path)
            coverURL = await uploadFileToS3(coverBuffer, `covers/${slug[0]}_cover.png`)
        } else {
            coverURL = coverField[0]
        }

        const venue = {
            name: name[0],
            slug: slug[0],
            theme: JSON.parse(theme[0]),
            enableOrders: JSON.parse(enableOrders[0]),
            logo: logoURL,
            cover: coverURL,
            owner: req.user.sub
        }
        if (!isEmpty(announcement)) venue.announcement = announcement[0]
        else venue.announcement = ''

        resolve(venue)

    })
})

const parseCategoryData = async (req) => new Promise((resolve, reject) => {
    const { venueId } = req
    var form = new multiparty.Form()
    form.parse(req, async (err, fields, files) => {
        if (err) {
            reject(err)
        }
        const { image } = files
        const { title, image: imageField } = fields

        let imageURL
        if (!isEmpty(image)) {
            const imageBuffer = fs.readFileSync(image[0].path)
            imageURL = await uploadFileToS3(imageBuffer, `categories/${venueId}_${title[0]}.png`)
        } else {
            // this is when it's an update. we're just passing the url.
            if (!isEmpty(imageField) && imageField[0] !== '[]') {
                imageURL = imageField[0]
            }
        }

        const category = {
            title: title[0],
            image: imageURL,
            venue: venueId
        }

        resolve(category)
    })
})

const parseProductData = async (req) => new Promise((resolve, reject) => {
    const { venueId } = req
    var form = new multiparty.Form()
    form.parse(req, async (err, fields, files) => {
        if (err) {
            reject(err)
        }

        const { image } = files
        const { name, price, quantity, category, details, additions, image: imageField } = fields

        let imageURL
        if (!isEmpty(image)) {
            const imageBuffer = fs.readFileSync(image[0].path)
            imageURL = await uploadFileToS3(imageBuffer, `categories/${venueId}_${name[0]}.png`)
        } else {
            // this is when it's an update. we're just passing the url.
            if (!isEmpty(imageField) && imageField[0] !== '[]') {
                imageURL = imageField[0]
            }
        }

        const product = {
            name: name[0],
            price: parseFloat(price[0]),
            category: category[0],
            quantity: quantity[0],
            additions: JSON.parse(additions[0]),
            image: imageURL,
            venue: venueId,
        }

        if (!isEmpty(details)) product.details = details[0]
        else product.details = ''

        resolve(product)
    })
})


module.exports = { parseVenueData, parseCategoryData, parseProductData }