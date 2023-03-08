import { useState } from 'react';
import { useChat } from './ChatContext';
import './styles.css';

export function MessageInput() {
    const { socket } = useChat();

    const [messageText, setMessageText] = useState("");

    function send() {
        socket.send(messageText);
        setMessageText('');
    }

    return (
        <div className='message-input-box'>
                <input className='message-input' value={messageText} onChange={(e) => setMessageText(e.target.value)} />
                <button className='message-send' onClick={send}>🗨</button>
            
        </div>
    )
}
