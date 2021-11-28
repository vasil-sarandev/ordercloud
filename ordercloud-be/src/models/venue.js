const validator = require('validator')
const mongoose = require('mongoose')
const Category = require('./category')



const venueSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        owner: {
            type: String,
            trim: true,
            required: true,
            //1 venue per user.
            unique: true
        },
        slug: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            validate: (val) => {
                const valid = validator.isSlug(val)
                if (!valid) {
                    throw new Error('Not a valid slug (url).')
                }
            }
        },
        logo: {
            type: String,
            required: true,
            validate: (val) => {
                const valid = validator.isURL(val)
                if (!valid) {
                    throw new Error('Image must be a url.')
                }
            },
        },
        cover: {
            type: String,
            required: true,
            validate: (val) => {
                const valid = validator.isURL(val)
                if (!valid) {
                    throw new Error('Cover must be a url.')
                }
            },
        },
        announcement: {
            type: String,
            trim: true
        },
        enableOrders: {
            type: Boolean,
            required: true,
            default: true
        },
        enablePickUp: {
            type: Boolean,
            required: true,
            default: true
        },
        theme: {
            primary: {
                type: String,
                required: true,
                default: '#ff8000',
                validate: (val) => {
                    const valid = validator.isHexColor(val)
                    if (!valid) {
                        throw new Error('Theme colors must be in HEX format.')
                    }
                }
            },
            secondary: {
                type: String,
                required: true,
                default: '#ff6a5d',
                validate: (val) => {
                    const valid = validator.isHexColor(val)
                    if (!valid) {
                        throw new Error('Theme colors must be in HEX format.')
                    }
                }
            }
        }
    },
    { timestamps: true }
)

venueSchema.pre('remove', async function (next) {
    const venue = this
    await Category.deleteMany({ venue: venue._id })
    next()
})

venueSchema.virtual('categories', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'venue'
})

venueSchema.methods.toJSON = function () {
    const venue = this.toObject({ virtuals: true })
    if (!venue.categories) venue.categories = []
    delete venue.owner
    return venue
}

const Venue = mongoose.model('Venue', venueSchema)

module.exports = Venue