import API from '../application/api';
import LocalStorage from '../application/localStorage';

class BasePage {
    api: API;
    constructor(api: API) {
        this.api = api;
    }
    init(query: URLSearchParams) {
        this.changeHeader();
        this.changeFooter();
    }
    changeHeader() {
        if (LocalStorage.instance.isAuth()) {
            (document.querySelector('.auth') as HTMLElement).classList.add('display-none');
            (document.querySelector('.logout') as HTMLElement).classList.remove('display-none');
        } else {
            (document.querySelector('.auth') as HTMLElement).classList.remove('display-none');
            (document.querySelector('.logout') as HTMLElement).classList.add('display-none');
        }
    }
    changeFooter() {
        (document.querySelector('.footer') as HTMLElement).classList.remove('display-none');
    }
}

export default BasePage;
