import '../CSS/Login.css';
import { useState } from "react";
import useAuthContext from '../Providers/useAuthContext';
import NavigationComponent from "../Components/NavigationComponent";
import Form from "../Components/LoginFormComponent";
import { login, getUserFromStorage} from "../Helper/ServerRequest";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const { setIsLoggedIn, setUser} = useAuthContext();

    let [form, setForm] = useState({
        login: '', password: '',
    });

    const handleState = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function onSubmit() {
        await login({ login: form.login, password: form.password });
        const { firstName, lastName } = getUserFromStorage();
        setIsLoggedIn(true);
        navigate("/main");
    }

    return (<div>
        <NavigationComponent>register</NavigationComponent>
        <div className="App">
            <Form
                onChange={handleState}
                onSubmit={onSubmit}
                form={form}
            />
        </div>
    </div>);
}

export default Login;