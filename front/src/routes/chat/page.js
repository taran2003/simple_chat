import { ChatContextProvider, useChat } from './ChatContext';
import { getLogin } from '../../localStorage';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useMemo } from 'react';

export function ChatPage() {
    return (
        <ChatContextProvider>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '800px' }}>
                    <MessageList/>
                    <MessageInput/>
                </div>
            </div>
        </ChatContextProvider>
    );
}
