const validator = require('validator')
const mongoose = require('mongoose')
const Product = require('./product')

const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true
        },
        image: {
            type: String,
            validate: (val) => {
                const valid = validator.isURL(val)
                if (!valid) {
                    throw new Error('Image must be a url.')
                }
            },
        },
        venue: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Venue'
        }
    },
    { timestamps: true }
)

categorySchema.pre('save', async function (next) {
    const category = this
    if (this.isNew) {
        const match = await Category.findOne({ venue: category.venue, title: category.title })
        if (match) throw new Error('A category with this name already exists.')
    }
    next()
})

categorySchema.pre('remove', async function (next) {
    const category = this
    await Product.deleteMany({ category: category._id })
    next()
})

categorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category'
})

categorySchema.methods.toJSON = function () {
    const category = this.toObject({ virtuals: true })
    if (!category.products) category.products = []
    return category
}


const Category = mongoose.model('Category', categorySchema)

module.exports = Category