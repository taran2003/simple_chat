import io from 'socket.io-client';
import { getTokens } from "../../localStorage";
import { SERVER_URL } from "../../serverRequest";

export function initSocket(setMessages) {
    const sock = io(SERVER_URL, {
        auth: (cb) => {
          cb({
            token: getTokens().accessToken
          });
        }
      });
    sock.on('message', msg => {
        setMessages(msgs => [...msgs, msg]);
    });
    sock.on('remove', id => {
        setMessages(msgs => {
            const i = msgs.findIndex(m => m.id == id);
            msgs.splice(i, 1);
            return msgs;
        });
    });
    sock.on('modify', ({ id, text }) => {
        setMessages(msgs => {
            const i = msgs.findIndex(m => m.id == id);
            msgs[i].text = text;
            return msgs;
        });
    });
    sock.on('error', e => {
        console.error('Message sending failed: ', e);
    });
    return sock;
}