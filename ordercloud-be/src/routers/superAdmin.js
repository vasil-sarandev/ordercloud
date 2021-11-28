const express = require('express')
const { isEmpty } = require('lodash')
const auth = require('../lib/middleware/auth')
const superAdmin = require('../lib/middleware/superAdmin')
const Venue = require('../models/venue')
const { ObjectId } = require('bson')

const router = new express.Router()


router.post('/venues', auth, superAdmin, async (req, res) => {
    const { filter: nameFilter, pagination: { next, limit, count } } = req.body
    try {
        const filter = {}
        if (next) filter._id = { '$lt': ObjectId(next) }
        if (nameFilter) filter.name = { $regex: nameFilter, $options: 'i' }

        const venues = await Venue.find(filter).limit(limit).sort({ _id: -1 })

        if (isEmpty(venues)) return res.status(200).send({ data: [] })

        const countFilter = {}
        if (nameFilter) countFilter.name = { $regex: nameFilter, $options: 'i' }

        const pagination = {
            count: count ? await Venue.countDocuments(countFilter) : undefined,
            next: venues[venues.length - 1]._id,
            limit: limit
        }
        res.send({ data: venues, paging: pagination })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

module.exports = router