import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import req, { SERVER_URL } from '../../serverRequest';
import io from 'socket.io-client';
import { getTokens } from '../../localStorage';

const ChatContext = React.createContext({});

export function ChatContextProvider({ children }) {
    const [messages, setMessages] = useState([]);
    const socket = useMemo(() => {
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
        sock.on('error', e => {
            console.error('Message sending failed: ', e);
        });
        return sock;
    }, []);

    const [fetched, setFetched] = useState(false);
    useEffect(
        () => {
            (async() => {
                setMessages(await req.fetch());
                setFetched(true);
            })
            ().catch(console.error);
        },
        []
    );
    return (
        <ChatContext.Provider value={{
            socket, messages, setMessages, fetched
        }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    return useContext(ChatContext);
}
