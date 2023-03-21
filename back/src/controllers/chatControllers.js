const messageRepository = require('../repositories/messageRepository')

const fetchController = async (req, res, next) => {
    try {
        res.send({ messages: messageRepository.all() });
    } catch (e) {
        next (e);
    }
};

module.exports = {
    fetchController,
}