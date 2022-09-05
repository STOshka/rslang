import API from '../application/api';

class BasePage {
    api: API;
    constructor(api: API) {
        this.api = api;
    }
    init(query: URLSearchParams) {
        this.changeFooter();
    }
    changeFooter() {
        (document.querySelector('.footer') as HTMLElement).classList.remove('display-none');
    }
}

export default BasePage;