import API from './api';

class Authorization {
    api: API;
    static instance: Authorization;
    constructor(api: API) {
        Authorization.instance = this;
        this.api = api;
    }
    async checkToken() {
        if (Authorization.instance.isAuth()) {
            try {
                const response = await this.api.generateToken();
                const data = await response.json();
                Authorization.instance.authToken(data.token, data.refreshToken);
            } catch (e) {
                throw new Error('auth');
            }
        } else {
            throw new Error('auth');
        }
    }
    authUser(userId: string, userToken: string, refreshToken: string) {
        localStorage.setItem('userId', userId);
        Authorization.instance.authToken(userToken, refreshToken);
    }
    authToken(userToken: string, refreshToken: string) {
        localStorage.setItem('userToken', userToken);
        localStorage.setItem('refreshToken', refreshToken);
    }
    getUserId() {
        return localStorage.getItem('userId');
    }
    getUserName() {
        return localStorage.getItem('userName');
    }
    getUserToken() {
        return localStorage.getItem('userToken');
    }
    getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }
    isAuth() {
        return Boolean(this.getUserId());
    }
    logOut() {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userToken');
        localStorage.removeItem('refreshToken');
    }
}

export default Authorization;
