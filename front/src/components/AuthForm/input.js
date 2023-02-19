import { useState } from 'react';

export function AuthFormInput({ name }) {
    const [value, setValue] = useState('');
    return <div className='auth-input-box'>
        <label className='auth-input-label'>{name}</label>
        <input className='auth-input' type='text' value={value} onChange={(e) => setValue(e.target.value)}/>
    </div>
}
