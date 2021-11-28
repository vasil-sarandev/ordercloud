const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
const CONNECTION_URL = process.env.CONNECTION_URL

const useMongoose = () => {
    mongoose.connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
}


module.exports = useMongoose