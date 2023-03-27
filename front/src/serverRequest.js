import { getTokens, setLogin, setTokens } from './localStorage';

export const SERVER_URL = 'http://localhost:3001';

function req(method, url, data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function () {
            if (this.status >= 200 && this.status < 300) {
                if(this.responseText != '') {
                    resolve(JSON.parse(this.responseText));
                }
                else {
                    resolve(null);
                }
            }
            else {
                reject({
                    status: this.status,
                    statusText: this.statusText,
                    responseText: this.responseText,
                });
            }
        });
        xhr.open(method, `${SERVER_URL}/api/${url}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        if(getTokens()){
            const { accessToken } = getTokens();
            if (accessToken) {
                xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
            }
        }
        xhr.send(!!data ? JSON.stringify(data) : null);
    });
}

const login = ({ login, password }) => {
   
    return req('POST', 'auth/login', {
        login, password
    });
};

const register = ({ login, password, email}) => {
    return req('POST', 'auth/register', {
        login, password, email
    });
};

const fetch = async () => {
    return (await req('GET', 'chat/fetch')).messages;
}

export default {
    login, register, fetch
}
