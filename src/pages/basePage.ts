import API from '../application/api';
import LocalStorage from '../application/localStorage';
import { ROUTES } from '../utils/types';

class BasePage {
    api: API;
    constructor(api: API) {
        this.api = api;
    }
    init(query: URLSearchParams) {
        const BODY = document.querySelector('body') as HTMLElement;
        BODY.innerHTML = `<header class="header">${this.createHeader()}</header>
        <main class="main">MAIN</main>
        <footer class="footer">${this.createFooter()}</footer>`;
        if (LocalStorage.instance.isAuth()) {
            (document.querySelector('.auth') as HTMLElement).classList.add('display-none');
            (document.querySelector('.logout') as HTMLElement).addEventListener('click', () => {
                localStorage.removeItem('userId');
                localStorage.removeItem('userName');
                localStorage.removeItem('userToken');
                window.location.reload();
            });
        } else {
            (document.querySelector('.logout') as HTMLElement).classList.add('display-none');
        }
    }
    createHeader(): string {
        return `<nav class="header-nav">
                <ul class="header-nav-list">
                    <li class="header-nav-item"><a href="${ROUTES.HOME_PAGE}" class="header-nav-link">Главная</a></li>
                    <li class="header-nav-item"><a href="${ROUTES.WORD_LIST}" class="header-nav-link">Учебник</a></li>
                    <li class="header-nav-item header-nav-games">Игры
                        <div class="header-nav-games-container">
                            <a href="${ROUTES.AUDIO_CHALLENGE_GAME}" class="header-nav-link header-nav-link-game">Аудиовызов</a>
                            <a href="${ROUTES.SPRINT_GAME}" class="header-nav-link header-nav-link-game">Спринт</a>
                        </div>
                    </li>
                    <li class="header-nav-item"><a href="${ROUTES.STATISTICS}" class="header-nav-link">Статистика</a></li>
                    <li class="header-nav-item auth-bnt auth">
                        <a href="${ROUTES.AUTH_PAGE}" class="header-nav-link">Вход
                            <div class="auth-in-logo"></div>
                        </a>
                    </li>
                    <li class="header-nav-item auth-bnt logout">Выход<div class="auth-out-logo"></div></li>
                </ul>
            </nav>`;
    }
    createFooter(): string {
        return `<div class="footer-items">
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
                <a class="rss-logo" href="https://rs.school/js/"></a>`;
    }
}

export default BasePage;
