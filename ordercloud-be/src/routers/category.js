const { ObjectId } = require('bson')
const express = require('express')
const { isEmpty } = require('lodash')
const auth = require('../lib/middleware/auth')
const venueId = require('../lib/middleware/venue')
const Category = require('../models/category')
const { parseCategoryData } = require('../util/mappers')

const router = new express.Router()

router.post('/', auth, venueId, async (req, res) => {
    const categoryObj = await parseCategoryData(req)
    const category = new Category(categoryObj)
    try {
        await category.save()
        res.send(category)
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
})

router.post('/pagination', auth, venueId, async (req, res) => {
    const { venueId } = req
    const { filter: titleFilter, pagination: { next, limit, count } } = req.body
    try {
        const filter = { venue: venueId }
        if (titleFilter) filter.title = { $regex: titleFilter, $options: 'i' }
        if (next) filter._id = { '$gt': ObjectId(next) }
        const categories = await Category.find(filter).limit(limit).populate('products')

        if (isEmpty(categories)) return res.status(200).send({ data: [] })

        const countFilter = { venue: venueId }
        if (titleFilter) countFilter.title = { $regex: titleFilter, $options: 'i' }
        const pagination = {
            count: count ? await Category.countDocuments(countFilter) : undefined,
            next: categories[categories.length - 1].id,
            limit: limit
        }
        res.send({ data: categories, paging: pagination })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.get('/:id', auth, async (req, res) => {
    const { id } = req.params
    try {
        const category = await Category.findOne({ _id: id })
        if (!category) return res.status(404).send({ message: 'Category not found.' })
        res.send(category)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.patch('/:id', auth, venueId, async (req, res) => {
    const { id } = req.params
    const updates = await parseCategoryData(req)
    try {
        const category = await Category.findOne({ _id: id, venue: updates.venue })
        if (!category) return res.status(404).send({ message: 'Category not found' })
        Object.keys(updates).forEach(update => category[update] = updates[update])
        await category.save()
        res.send(category)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.delete('/:id', auth, venueId, async (req, res) => {
    const { id } = req.params
    const { venueId } = req
    try {
        const deleted = await Category.findOneAndDelete({ _id: id, venue: venueId })
        if (!deleted) return res.status(404).send({ message: 'Category not found.' })
        res.send(deleted)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

module.exports = router