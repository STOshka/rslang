import API from '../../application/api';
import BasePage from '../basePage';
import { addMainHTML } from './helpers';

class MainPage extends BasePage {
    constructor(api: API) {
        super(api);
    }
    init(query: URLSearchParams) {
        super.init(query);
        const MAIN = document.querySelector('.main') as HTMLElement;
        MAIN.innerHTML = addMainHTML();
    }
}

export default MainPage;
