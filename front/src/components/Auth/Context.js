import React, { useContext, useState } from 'react';

const unauthenticatedState = { isUserLoggedIn: false, userInfo: null };

const AuthContext = React.createContext(unauthenticatedState);

export function AuthProvider({ children }) {
    const [{ isUserLoggedIn, userInfo }, setState] = useState(unauthenticatedState);

    const updateUserInfo = (newUserInfo) => {
        setState({
            isUserLoggedIn: !!newUserInfo,
            userInfo: newUserInfo,
        })
    }

    const logout = () => {
        setState(unauthenticatedState);
    }

    return (
        <AuthContext.Provider value={{
            isUserLoggedIn,
            userInfo,
            updateUserInfo,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
