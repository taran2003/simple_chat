import { formToJSON } from "axios";
import { useState } from "react";
// import useAuthContext from '../Providers/useAuthContext';
// import NavigationComponent from "../Components/NavigationComponent";
// import { login, getUserFromStorage} from "../Helper/ServerRequest";
// import { useNavigate } from "react-router-dom";

function Login() {
    // const navigate = useNavigate();
    // const { setIsLoggedIn, setUser} = useAuthContext();

    let [form, setForm] = useState({
        login: '', password: '',
    });

    const handleState = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function onSubmit() {
        // await login({ login: form.login, password: form.password });
        // const { firstName, lastName } = getUserFromStorage();
        // setIsLoggedIn(true);
        // navigate("/main");
        console.log(form);
        return false;
    }

    return (<div>
        {/* <NavigationComponent>register</NavigationComponent> */}
        <div className="App">
            <form onSubmit={onSubmit}>
                <input type="text" onChange={handleState} placeholder={"Login"}></input>
                <input type="password" onChange={handleState} placeholder={"password"}></input>
                <input type="submit"></input>
            </form>
        </div>
    </div>);
}

export default Login;