import API from '../../application/api';
import BasePage from '../basePage';
import './home.css';

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

function addMainHTML() {
    return `
    <div class="home-background1">
    <div class="home-background2">
        <div class="home-text1">
        </div>
        <div class="home-text2">
        </div>
        <div class="team-link-container">
            <a href="#about" class="team-link">О команде</a>
        </div>
    </div>
    </div>
    `;
}

export default MainPage;
