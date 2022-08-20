import API from '../../application/api';
import BasePage from '../basePage';

class SprintPage extends BasePage {
    constructor(api: API) {
        super(api);
    }
    init() {
        const BODY = document.querySelector('body') as HTMLElement;
        BODY.innerHTML = 'SPRINT';
    }
}

export default SprintPage;
