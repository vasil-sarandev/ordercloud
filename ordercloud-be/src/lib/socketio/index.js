const useSocketIo = (io) => {
    io.on('connection', (socket) => {
        // socket.on('disconnect', () => {
        // })
        socket.on('order', async (id) => {
            // whenever an order has been emitted to server, emit to everyone else an event with that id 
            io.emit(id)
        })
    })
}

module.exports = useSocketIo