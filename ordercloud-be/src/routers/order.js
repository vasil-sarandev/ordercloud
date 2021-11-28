const { ObjectId } = require('bson')
const express = require('express')
const { isEmpty } = require('lodash')
const auth = require('../lib/middleware/auth')
const venueId = require('../lib/middleware/venue')
const Order = require('../models/order')
const Venue = require('../models/venue')

const router = new express.Router()

router.post('/', async (req, res) => {
    try {
        const { slug } = req.body
        const venue = await Venue.findOne({ slug: slug })
        delete req.body.slug
        const order = new Order({
            ...req.body,
            venue: venue.id
        })
        await order.save()
        // sending venue id for emit to socket io.
        res.send(venue.id)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})


router.post('/pagination', auth, venueId, async (req, res) => {
    const { venueId } = req
    const { pagination: { next, limit, count } } = req.body
    try {
        const filter = { venue: venueId }
        if (next) filter._id = { '$lt': ObjectId(next) }
        const orders = await Order.find(filter).limit(limit).sort({ _id: -1 })

        if (isEmpty(orders)) return res.status(200).send({ data: [] })

        const countFilter = { venue: venueId }
        const pagination = {
            count: count ? await Order.countDocuments(countFilter) : undefined,
            next: orders[orders.length - 1]._id,
            limit: limit
        }
        res.send({ data: orders, paging: pagination })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.put('/:id/complete', auth, venueId, async (req, res) => {
    const { id } = req.params
    const { venueId } = req
    try {
        const order = await Order.findOne({ _id: id, venue: venueId })
        if (!order) return res.status(404).send({ message: 'Order not found.' })
        order.complete = true
        await order.save()
        res.send(order)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.get('/:id', auth, venueId, async (req, res) => {
    const { id } = req.params
    const { venueId } = req
    try {
        const order = await Order.findOne({ _id: id, venue: venueId })
        if (!order) return res.status(404).send({ message: 'Order not found.' })
        res.send(order)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

module.exports = router