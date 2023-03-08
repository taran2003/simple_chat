import AuthForm from '../../components/Auth/Form';
import { AuthFormInput } from '../../components/Auth/Form/input';
import { useState } from 'react';
import req from '../../serverRequest';
import { useNavigate } from 'react-router-dom';
import { setLogin, setTokens } from '../../localStorage';

export function LoginPage() {
    const navigate = useNavigate();

    const [value, setValue] = useState({
        login:'',
        password:''
    });

    const confirm = async () =>{
        try {
            const { user, ...toks } = await req.login({ ...value });
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

    return <AuthForm submitText="Login" onSubmit={confirm}>
        <AuthFormInput label="Login" name="login" type="text" onChange={handleState} value={value.login}/>
        <AuthFormInput label="Password" name="password" type="password" onChange={handleState} value={value.password}/>
    </AuthForm>
}