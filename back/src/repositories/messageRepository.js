const messages = []

function add(msg) {
    messages.push(msg);
}

function all() {
    return messages;
}

module.exports = {
    add, all
}
