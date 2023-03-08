import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getLogin, getTokens } from '../../localStorage';
import { useAuth } from './Context';

export function AuthRequired({ redirect }) {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        (async() => {
            if(auth.isUserLoggedIn) return;

            const tokens = getTokens();
            const login = getLogin();

            if(!tokens || !login) {
                navigate(redirect);
                return;
            }

            auth.updateUserInfo({
                login
            });
        })().catch(console.error);
    }, [auth.isUserLoggedIn, auth, redirect]);

    if(auth.isUserLoggedIn) {
        return (
            <Outlet/>
        );
    }
    else {
        return 'Loading';
    }
}
