import axios from 'axios';

export const axiosInstance = axios.create({
    withCredentials: true,
});

export const getSessionFromStorage = () => {
    return {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
    }
}

export const getUserFromStorage = () => {
    return {
        login: localStorage.getItem('login')
    }
}

function authHeaders() {
    let { accessToken } = getSessionFromStorage();
    return {
        Authorization: `Bearer ${accessToken}`,
    };
};

const Request = async ({
    headers = {},
    method = 'POST',
    url,
    data,
    params,
    isUpdatable = false
}) => {

    const options = {
        headers,
        method,
        data,
        params,
        url,
    };
    
    let { accessToken, refreshToken } = getSessionFromStorage();

    if (accessToken) {
        options.headers = {
            ...options.headers,
            ...authHeaders()
        }
    }
    
    try {
        const result = await axiosInstance(options)
        return result;
    } catch (error) {
        // if (isUpdatable) {
        //     try {
        //         await refreshTokens({ accessTok: accessToken, refreshTok: refreshToken })
        //         options.headers = {
        //             ...options.headers,
        //             ...authHeaders()
        //         }
        //         const result = await axiosInstance(options);
        //         return result;
        //     }catch(error){
        //         throw(error)
        //     }
        
        // }
        throw error;
    }
};

export const loginReq = async ({ login, password }) => {
    const { data } = await Request({
        url: 'http://localhost:3001/api/auth/login',
        data: {
            login,
            password,
        },
    });
    let { accessToken, refreshToken } = data;
    localStorage.setItem('accessToken', (accessToken));
    localStorage.setItem('refreshToken', (refreshToken));
    localStorage.setItem('login', (data.user.login));
    return data.user;
};

export const register = async ({ login, password, passwordConf, email}) => {
    if (password !== passwordConf) {
        return;
    }
    const { data } = await Request({
        url: 'http://localhost:3001/api/auth/register',
        data: {
            login,
            password,
            email
        },
    });
    return data;
};