/**
 * 
 * @param {{ date: Date }} param0 
 * @returns 
 */
export function Clock({ date }) {
    const text = date.getDay() == new Date().getDay() ? date.toTimeString().substring(0, 5) : date.toDateString()
    return (
        <div style={{
            width: '1000',
            textAlign: 'center'
        }}>
            {text}
        </div>
    );
}
