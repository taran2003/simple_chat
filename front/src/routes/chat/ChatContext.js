import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import req from '../../serverRequest';
import { initSocket } from './socket';

const ChatContext = React.createContext({});

export function ChatContextProvider({ children }) {
    const [messages, setMessages] = useState([]);
    const socket = useMemo(() => initSocket(setMessages), []);
    const [fetched, setFetched] = useState(false);
    const [selection, setSelection] = useState(null);

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
            socket, messages, setMessages, fetched, selection, setSelection
        }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    return useContext(ChatContext);
}
