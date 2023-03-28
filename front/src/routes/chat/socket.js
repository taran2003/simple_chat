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
            const i = msgs.findIndex(m => m.id === id);
            const newMsgs = msgs.slice();
            newMsgs.splice(i, 1);
            return newMsgs;
        });
    });
    sock.on('modify', ({ id, text }) => {
        setMessages(msgs => {
            const i = msgs.findIndex(m => m.id === id);
            const newMsgs = msgs.slice();
            newMsgs[i].text = text;
            return newMsgs;
        });
    });
    sock.on('error', e => {
        console.error('Message sending failed: ', e);
    });
    return sock;
}