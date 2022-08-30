class LocalStorage {
    static instance: LocalStorage = new LocalStorage();
    authUser(userId: string, name: string, userToken: string) {
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', name);
        localStorage.setItem('userToken', userToken);
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
    isAuth() {
        return Boolean(this.getUserId());
    }
}

export default LocalStorage;
