class LocalStorage {
    static instance: LocalStorage = new LocalStorage();
    authUser(userId: string, userToken: string) {
        localStorage.setItem('userId', userId);
        localStorage.setItem('userToken', userToken);
    }
    getUserId() {
        return localStorage.getItem('userId');
    }
    getUserToken() {
        return localStorage.getItem('userToken');
    }
    isAuth() {
        return Boolean(this.getUserId());
    }
}

export default LocalStorage;
