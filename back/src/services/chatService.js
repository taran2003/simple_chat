const { TokenExpiredError } = require('jsonwebtoken');
const { verifyToken } = require('../helper/jwt');
const userRepository = require('../repositories/userRepository');
const messageRepository = require('../repositories/messageRepository');

async function checkSocketAuth(socket, cb) {
    const token = socket.handshake.auth.token;
    try {
        const {id, login} = verifyToken(token, process.env.JWT_ACCESS_KEY);
        const user = await userRepository.getById({ id });
        
        if (!user) {
            throw 42;
        }
        cb(user);
    }
    catch(e) {
        if(e instanceof TokenExpiredError) {
            socket.emit("error", "token-expired");
            return;
        }
     
        socket.emit("error", "unauthenticated");
    }
}

/** 
 * @param {Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>} io 
 */
function initialize(io) {
    io.on('connection', (socket) => {
        socket.on('message', text => {
            checkSocketAuth(socket, ({ login }) => {
                const msg = messageRepository.add({ text, login, time: Date.now() });
                io.emit('message', msg);
            });
        });
        socket.on('replace', ({ id, text })  => {
            checkSocketAuth(socket, ({ login: usrLogin }) => {
                if(!messageRepository.check(id, ({ login: msgLogin }) => msgLogin == usrLogin)) {
                    socket.emit('error', 'unauthorized');
                    return;
                }
                const trimmedText = text.trim();
                if(trimmedText.length == 0) {
                    messageRepository.remove(id);
                    io.emit('remove', id);
                }
                else {
                    messageRepository.modify(id, trimmedText);
                    io.emit('modify', { id, text });
                }
            });
        });
    });
}

module.exports = {
    initialize
}
