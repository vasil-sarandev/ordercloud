/* eslint-disable no-unused-vars */
const express = require('express')
const auth = require('../lib/middleware/auth')
const venueId = require('../lib/middleware/venue')
const Category = require('../models/category')
const Venue = require('../models/venue')
const { parseVenueData } = require('../util/mappers')

const router = new express.Router()

router.post('/', auth, async (req, res) => {
    const venueObj = await parseVenueData(req)
    const venue = new Venue(venueObj)
    try {
        await venue.save()
        res.json(venue.toJSON())
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.get('/mine', auth, async (req, res) => {
    const id = req.user.sub
    try {
        const venue = await Venue.findOne({ owner: id })
        if (venue) res.send({
            isVenueOwner: true,
            venueId: venue.id
        })
        else res.send({
            isVenueOwner: false,
            venueId: null
        })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.get('/slug/mine', auth, async (req, res) => {
    const id = req.user.sub
    try {
        const venue = await Venue.findOne({ owner: id })
        if (venue) res.send(venue.slug)
        else res.status(404).send({ message: 'Venue not found.' })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.get('/all', async (req, res) => {
    try {
        const venues = await Venue.find({})
        const venuesSlugs = venues.map(x => x.slug)
        if (!venues) return res.status(404).send({ message: 'Venues not found.' })
        res.send(venuesSlugs)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.get('/menu/:slug', async (req, res) => {
    const { slug } = req.params
    try {
        const venue = await Venue.findOne({ slug }).populate({
            path: 'categories',
            populate: {
                path: 'products'
            }
        })
        if (!venue) return res.status(404).send({ message: 'Venue not found.' })
        res.json(venue)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.post('/available/name', auth, async (req, res) => {
    const { name } = req.body
    try {
        const match = await Venue.findOne({ name: name })
        if (match) res.send(false)
        else res.send(true)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.post('/available/slug', auth, async (req, res) => {
    const { slug } = req.body
    try {
        const match = await Venue.findOne({ slug: slug })
        if (match) res.send(false)
        else res.send(true)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.get('/info/:slug', async (req, res) => {
    const { slug } = req.params
    try {
        const venue = await Venue.findOne({ slug })
        if (!venue) return res.status(404).send({ message: 'Venue not found.' })
        res.json(venue)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.get('/categories/:venueId', async (req, res) => {
    const { venueId } = req.params
    try {
        const categories = await Category.find({ venue: venueId }).populate({ path: 'products' })
        if (!categories) return res.status(404).send({ message: 'Categories not found.' })
        res.json(categories)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.get('/personalization', auth, venueId, async (req, res) => {
    const { venueId } = req
    try {
        const venue = await Venue.findOne({ _id: venueId })
        if (!venue) return res.status(404).send({ message: 'Venue not found' })
        res.json(venue)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.patch('/', auth, venueId, async (req, res) => {
    const { venueId } = req
    const updates = await parseVenueData(req)
    try {
        const venue = await Venue.findOne({ _id: venueId })
        if (!venue) return res.status(404).send({ message: 'Venue not found' })
        Object.keys(updates).forEach(update => venue[update] = updates[update])
        await venue.save()
        res.send(venue)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.delete('/', auth, venueId, async (req, res) => {
    const { venueId } = req
    try {
        const deleted = await Venue.findOneAndDelete({ _id: venueId })
        if (!deleted) return res.status(404).send({ message: 'Venue not found.' })
        res.send(deleted)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

module.exports = router