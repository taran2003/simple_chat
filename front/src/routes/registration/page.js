import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/Auth/Form';
import { AuthFormInput } from '../../components/Auth/Form/input';
import { setLogin, setTokens } from '../../localStorage';
import req from '../../serverRequest';

export function RegistrationPage() {
    const navigate = useNavigate();

    const [value, setValue] = useState({
        login: '',
        email: '',
        password: ''
    });

    const confirm = async () =>{
        try {
            const { user, ...toks } = await req.register({ ...value });
            setLogin(user.login);
            setTokens(toks);
            navigate('/chat');
            return;
        }
        catch(e) {
            console.error(e);
            alert(e);
        }
    }

    const handleState = (e) => {
        setValue({...value,[e.target.name]:e.target.value});
    }

    return <AuthForm submitText="Register" onSubmit={confirm}>
        <AuthFormInput label="Login" name="login" type="text" onChange={handleState} value={value.login}/>
        <AuthFormInput label="Email" name="email" type="Email" onChange={handleState} value={value.email}/>
        <AuthFormInput label="Password" name="password" type="password" onChange={handleState} value={value.password}/>
    </AuthForm>
}
