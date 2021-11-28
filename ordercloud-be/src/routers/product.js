const { ObjectId } = require('bson')
const express = require('express')
const { isEmpty } = require('lodash')
const auth = require('../lib/middleware/auth')
const venueId = require('../lib/middleware/venue')
const Category = require('../models/category')
const Product = require('../models/product')
const { parseProductData } = require('../util/mappers')

const router = new express.Router()

router.post('/', auth, venueId, async (req, res) => {
    const productObj = await parseProductData(req)
    const product = new Product(productObj)
    try {
        await product.save()
        res.send(product)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.post('/pagination', auth, venueId, async (req, res) => {
    const { venueId } = req
    const { filter: nameFilter, pagination: { next, limit, count } } = req.body
    try {
        const filter = { venue: venueId }
        if (nameFilter) filter.name = { $regex: nameFilter, $options: 'i' }
        if (next) filter._id = { '$gt': ObjectId(next) }
        const products = await Product.find(filter).limit(limit)

        if (isEmpty(products)) return res.status(200).send({ data: [] })

        const countFilter = { venue: venueId }
        if (nameFilter) countFilter.name = { $regex: nameFilter, $options: 'i' }
        const pagination = {
            count: count ? await Product.countDocuments(countFilter) : undefined,
            next: products[products.length - 1].id,
            limit: limit
        }
        res.send({ data: products, paging: pagination })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})


router.get('/categoryOptions', auth, venueId, async (req, res) => {
    const { venueId } = req
    try {
        const categories = await Category.find({ venue: venueId })
        if (!categories.length) return res.status(404).send({ message: 'You have no categories created.' })
        const categoryOptions = categories.map(x => ({ label: x.title, value: x.id }))
        res.send(categoryOptions)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.get('/:id', auth, venueId, async (req, res) => {
    const { id } = req.params
    const { venueId } = req
    try {
        const product = await (await Product.findOne({ _id: id, venue: venueId })).toJSON()
        if (!product) return res.status(404).send({ message: 'Product not found.' })
        // send category as well so we can "select" it
        const categoryMatch = await Category.findOne({ _id: product.category })
        const mappedCategory = { label: categoryMatch.title, value: categoryMatch.id }
        product.category = mappedCategory
        res.send(product)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.patch('/:id', auth, venueId, async (req, res) => {
    const { id } = req.params
    const updates = await parseProductData(req)
    try {
        const product = await Product.findOne({ _id: id, venue: updates.venue })
        if (!product) return res.status(404).send({ message: 'Product not found' })
        Object.keys(updates).forEach(update => product[update] = updates[update])
        await product.save()
        res.send(product)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.delete('/:id', auth, venueId, async (req, res) => {
    const { id } = req.params
    const { venueId } = req
    try {
        const deleted = await Product.findOneAndDelete({ _id: id, venue: venueId })
        if (!deleted) return res.status(404).send({ message: 'Product not found.' })
        res.send(deleted)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})


module.exports = router