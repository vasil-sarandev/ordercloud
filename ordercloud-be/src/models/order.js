const mongoose = require('mongoose')
const validator = require('validator')

const ORDER_TYPES = {
    ON_SITE: 'ON_SITE',
    DELIVERY: 'DELIVERY',
    PICK_UP: 'PICK_UP'
}

const orderSchema = new mongoose.Schema(
    {
        venue: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Venue'
        },
        totalPrice: {
            type: Number,
            required: true
        },
        complete: {
            type: Boolean,
            required: true,
            default: false
        },
        details: {
            orderType: {
                type: String,
                required: true
            },
            siteLocation: {
                type: String
            },
            comment: {
                type: String
            },
            name: {
                type: String
            },
            phoneNumber: {
                type: String
            },
            address: {
                type: String
            }
        },
        products: [{
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
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
            }],
            product: {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product'
                },
                name: {
                    type: String,
                    required: true
                },
                image: {
                    type: String,
                    required: true,
                    validate: (val) => {
                        const valid = validator.isURL(val)
                        if (!valid) {
                            throw new Error('Image must be a url.')
                        }
                    }
                }
            }
        }]
    },
    { timestamps: true }
)


orderSchema.pre('save', function (next) {
    let err
    const order = this
    const { details } = order
    if (details.orderType === ORDER_TYPES.ON_SITE && !details.siteLocation) err = new Error('No site location specified for ON SITE order.')
    if (details.orderType === ORDER_TYPES.DELIVERY) {
        if (!details.name || !details.phoneNumber || !details.address) err = new Error('Missing details specified for DELIVERY order.')
    }
    next(err)
})


const Order = mongoose.model('Order', orderSchema)

module.exports = Order