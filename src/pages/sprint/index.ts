import API from '../../application/api';
import BaseGamePage from '../baseGamePage';

class SprintPage extends BaseGamePage {
    constructor(api: API) {
        super(api);
    }
    init(query: URLSearchParams) {
        super.init(query);
        const MAIN = document.querySelector('.main') as HTMLElement;
        MAIN.innerHTML = 'SPRINT';
    }
}

export default SprintPage;
