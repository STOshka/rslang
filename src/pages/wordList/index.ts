import API from '../../application/api';
import BasePage from '../basePage';

class WordListPage extends BasePage {
    constructor(api: API) {
        super(api);
    }
    init() {
        const BODY = document.querySelector('body') as HTMLElement;
        BODY.innerHTML = 'ERROR_PAGE';
    }
}

export default WordListPage;
