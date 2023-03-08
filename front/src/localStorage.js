const LSKEY_TOKENS = 'tokens';
const LSKEY_LOGIN = 'login';

export const getTokens = () => JSON.parse(localStorage.getItem(LSKEY_TOKENS));

export const getLogin = () => localStorage.getItem(LSKEY_LOGIN);

export const setTokens = (tokens) =>
    localStorage.setItem(LSKEY_TOKENS, JSON.stringify(tokens));

export const setLogin = (login) => localStorage.setItem(LSKEY_LOGIN, login);
