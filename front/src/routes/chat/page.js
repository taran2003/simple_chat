import { ChatContextProvider } from './ChatContext';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

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
