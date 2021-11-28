const Venue = require('../../models/venue')

const venueId = async (req, res, next) => {
    try {
        const user_id = req.user.sub
        const venue = await Venue.findOne({ owner: user_id })
        req.venueId = venue._id
        next()
    } catch (e) {
        res.status(401).send({ message: 'Unauthorized.' })
    }
}

module.exports = venueId