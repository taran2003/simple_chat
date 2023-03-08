import './styles.css';

export default function AuthForm({
    onSubmit,
    submitText,
    children,
}) {
    return (
        <div className='auth'>
            {children}
            <button className='auth-submit' onClick={onSubmit}>{submitText}</button>
        </div>
    );
}
