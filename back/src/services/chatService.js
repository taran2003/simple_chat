const { TokenExpiredError } = require('jsonwebtoken');
const { verifyToken } = require('../helper/jwt');
const userRepository = require('../repositories/userRepository');
const messageRepository = require('../repositories/messageRepository');

/** 
 * @param {Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>} io 
 */
function initialize(io) {
    io.on('connection', (socket) => {
        socket.on('message', text => {
            const token = socket.handshake.auth.token;
            try {
                const {id, login} = verifyToken(token, process.env.JWT_ACCESS_KEY);
                const user = userRepository.getById({ id });
                if (!user) {
                    throw 42;
                }

                const msg = { text, login, time: Date.now() };
                messageRepository.add(msg);
                io.emit('message', msg);
            }
            catch(e) {
                if(e instanceof TokenExpiredError) {
                    socket.emit("error", "token-expired");
                    return;
                }
                socket.emit("error", "unauthenticated");
            }
        });
    });
}

module.exports = {
    initialize
}
