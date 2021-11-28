/* eslint-disable no-undef */
require('dotenv').config({ path: `./config/.env.${process.env.NODE_ENV}` })
const express = require('express')
const cors = require('cors')
const socketIO = require('socket.io')
const http = require('http')
const appRouter = require('./routers')
const useMongoose = require('./db/mongoose')
const useSocketIo = require('./lib/socketio')
// const useWarmUpVercel = require('./lib/cron/useWarmUpVercel')


const corsOptions = {
    origin: ['https://ordercloud.bg', 'http://localhost:3000'],
    optionsSuccessStatus: 200 // For legacy browser support
}

useMongoose()
// useWarmUpVercel()


const app = express()
const server = http.createServer(app)

const io = socketIO(server, {
    cors: {
        origin: corsOptions.origin
    }
})

useSocketIo(io)

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3005



app.use(cors(corsOptions))


app.use(express.json())
app.use(appRouter)

server.listen(port, () => {
    console.log('server is up on port', port)
})

module.export = {
    io
}