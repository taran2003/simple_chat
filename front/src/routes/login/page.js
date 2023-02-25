import AuthForm from '../../components/AuthForm';
import { AuthFormInput } from '../../components/AuthForm/input';
import { useState } from 'react';
import { loginReq } from '../../serverRequest';

export function LoginPage() {

    const [value, setValue] = useState({
        login:'',
        password:''
    });

    const confirm = async () =>{
        await loginReq({ login: value.login, password: value.password });
    }

    const handelState = (e) => {
        setValue({...value,[e.target.name]:e.target.value});
    }

    return <AuthForm submitText="Login" onSubmit={confirm}>
        <AuthFormInput name="login" type="text" onChange={handelState} value={value.Login}/>
        <AuthFormInput name="password" type="password" onChange={handelState} value={value.Password}/>
    </AuthForm>
}