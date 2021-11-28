const validator = require('validator')
const mongoose = require('mongoose')

const PLACEHOLDER_IMAGE_URL = 'https://i.imgur.com/kQI2Smw.png'



const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        image: {
            type: String,
            trim: true,
            required: true,
            validate: (val) => {
                const valid = validator.isURL(val)
                if (!valid) {
                    throw new Error('Image must be a url.')
                }
            },
            default: PLACEHOLDER_IMAGE_URL
        },
        details: {
            type: String,
            trim: true,
            default: ''
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: String,
            trim: true,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category'
        },
        venue: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Venue'
        },
        additions: [{
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
        }]
    },
    { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product