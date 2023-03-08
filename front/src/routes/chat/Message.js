import './styles.css';

const emailRegex = /((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))/;

export function Message({ text, own }) {
    const contents = text
        .split(emailRegex)
        .map((x, i) => !!x && x.match(emailRegex) ? (<u key={`tp#${i}`}>{x}</u>) : <span key={`tp#${i}`}>{x}</span>);
    const sty = own ? 'message-own' : 'message-oth';
    return <div style={{
        width: '100%',
        display: 'flex',
    }}>
        <div className={sty}>
            <div style={{ margin: '10px' }}>
                {contents}
            </div>
        </div>
    </div>
}