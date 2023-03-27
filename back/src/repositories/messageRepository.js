const messages = []
let nextId = 0;

function add(msg) {
    msg.id = nextId;
    nextId += 1;
    messages.push(msg);
    return msg;
}

function all() {
    return messages;
}

function check(id, f) {
    const i = messages.findIndex(m => m.id == id);
    return f(messages[i]);
}

function modify(id, text) {
    const i = messages.findIndex(m => m.id == id);
    messages[i].text = text;
}

function remove(id) {
    const i = messages.findIndex(m => m.id == id);
    messages.splice(i, 1);
}

module.exports = {
    add, all, modify, remove, check
}
