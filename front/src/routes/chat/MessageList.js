import { useChat } from './ChatContext';
import { Message } from './Message';
import { Clock } from './Clock';
import { getLogin } from '../../localStorage';

const maxDeltaTimeS = 60;

export function MessageList() {
    const chat = useChat();
    const elems = [];
    const login = getLogin();
    let lastDate = new Date(0);
    for(let i = 0; i < chat.messages.length; ++i) {
        const msg = chat.messages[i];
        const date = new Date(msg.time);
        if(date.getTime() / 1000 - lastDate.getTime() / 1000 > maxDeltaTimeS) {
            lastDate = date;
            elems.push(<Clock key={`clock#${i}`} date={date}/>);
        }
        const handleSelect = () => {
            chat.setSelection({
                id: chat.messages[i].id,
                edited: false,
            });
        };
        elems.push(<Message key={`msg#${i}`} text={msg.text} own={msg.login == login} onSelect={handleSelect} />);
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {elems}
        </div>
    );
}
