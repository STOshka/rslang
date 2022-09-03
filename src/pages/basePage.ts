import API from '../application/api';

class BasePage {
    api: API;
    constructor(api: API) {
        this.api = api;
    }
    init(query: URLSearchParams) {
        const BODY = document.querySelector('body') as HTMLElement;
        BODY.innerHTML = `${this.createHeader()}
        <main class="main">MAIN</main>
        ${this.createFooter()}`;
        console.log(query);
    }
    createHeader(): string {
        return `
        <header class="header">
            <nav class="header-nav">
                <ul class="header-nav-list">
                    <li class="header-nav-item"><a href="" class="header-nav-link">Главная</a></li>
                    <li class="header-nav-item"><a href="#wordlist" class="header-nav-link">Учебник</a></li>
                    <li class="header-nav-item header-nav-games">Игры
                        <div class="header-nav-games-container">
                            <a href="#audio" class="header-nav-link header-nav-link-game">Аудио</a>
                            <a href="#sprint" class="header-nav-link header-nav-link-game">Спринт</a>
                        </div>
                    </li>
                    <li class="header-nav-item"><a href="#statistics" class="header-nav-link">Статистика</a></li>
                    <li class="header-nav-item auth-bnt">
                        <a href="#auth" class="header-nav-link">Вход
                            <div class="auth-in-logo"></div>
                        </a>
                    </li>
                    <li class="header-nav-item auth-bnt display-none">Выход
                        <div class="auth-out-logo"></div>
                    </li>
                </ul>
            </nav>
        </header>
        `;
    }
    createFooter(): string {
        return `
        <footer class="footer">
            <div class="footer-items">
                <p class="footer-item">©</p>
                <p class="footer-item">2022</p>
            </div>
            <div class="footer-items">
                <a class="gh-link" href="https://github.com/STOshka/">
                    <div class="gh-logo"></div>
                    <p class="gh-title">Alexandr Stoyanov</p>
                </a>
                <a class="gh-link" href="https://github.com/Yuliya0503/">
                    <div class="gh-logo"></div>
                    <p class="gh-title">Yuliya Narkevich</p>
                </a>
                <a class="gh-link" href="https://github.com/DenisWilk">
                    <div class="gh-logo"></div>
                    <p class="gh-title">Dzianis Valkovich</p>
                </a>
            </div>
            </div>
            <a class="rss-logo" href="https://rs.school/js/"></a>  
        </footer>
        `;
    }
}

export default BasePage;
