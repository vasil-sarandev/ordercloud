const express = require('express')
const venueRouter = require('./venue')
const categoryRouter = require('./category')
const productRouter = require('./product')
const orderRouter = require('./order')
const superAdminRouter = require('./superAdmin')

const router = new express.Router()

router.use('/venue', venueRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/order', orderRouter)
router.use('/superAdmin', superAdminRouter)

module.exports = router

