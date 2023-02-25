// import { useState } from 'react';

export function AuthFormInput({ name, type, onChange, value }) {
    // const [value, setValue] = useState('');
    return <div className='auth-input-box'>
        <label className='auth-input-label'>{name}</label>
        <input className='auth-input' name={name} type={type} onChange={onChange} value={value}/>
    </div>
}
