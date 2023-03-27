import { useState } from 'react';
import { useChat } from './ChatContext';
import './styles.css';

export function MessageInput() {
    const { socket, selection, setSelection, messages, setMessages } = useChat();

    const [messageText, setMessageText] = useState("");

    function send() {
        socket.send(messageText);
        setMessageText('');
    }

    if (!selection) {
        return (
            <div className='message-input-box'>
                <input className='message-input' value={messageText} onChange={(e) => setMessageText(e.target.value)} />
                <button className='message-send' onClick={send}>🗨</button>
            </div>
        );
    }

    const selectedIndex = messages.findIndex(m => m.id == selection.id);
    if (selection.edited) {
        const text = messages[selectedIndex].text;
        const handleChange = e => setMessages(msgs => {
            msgs[i].text = e.target.value;
            return msgs;
        });
        function finish() {
            setSelection(null);
            messages[selectedIndex].text = selection.oldText;
            socket.emit('replace', { id: selection.id, text });
        }
        return (
            <div className='message-input-box'>
                <input className='message-input' value={text} onChange={handleChange} />
                <button className='message-send' onClick={finish}>✓</button>
            </div>
        );
    }
    else {
        function remove() {
            setSelection(null);
            socket.emit('replace', { id: selection.id, text: "" });
        }
        function edit() {
            setSelection({ id: selection.id, edited: true, oldText: messages[selectedIndex].text });
        }
        return (
            <div className='message-input-box'>
                <button className='message-send' onClick={remove}>🗑</button>
                <button className='message-send' onClick={edit}>🖉</button>
            </div>
        );
    }
}
