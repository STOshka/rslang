import API from '../../application/api';
import BasePage from '../basePage';

class MainPage extends BasePage {
    constructor(api: API) {
        super(api);
    }
    init() {
        const BODY = document.querySelector('body') as HTMLElement;
        BODY.innerHTML = 'HOME_PAGE';
    }
}

export default MainPage;
