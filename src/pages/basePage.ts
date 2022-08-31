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
                    <li class="header-nav-item"><a href="" class="header-nav-link">Main</a></li>
                    <li class="header-nav-item"><a href="#wordlist" class="header-nav-link">Book</a></li>
                    <li class="header-nav-item header-nav-games">Games
                        <div class="header-nav-games-container">
                            <a href="#audio" class="header-nav-link header-nav-link-game">Audio</a>
                            <a href="#sprint" class="header-nav-link header-nav-link-game">Sprint</a>
                        </div>
                    </li>
                    <li class="header-nav-item"><a href="#statistics" class="header-nav-link">Statistics</a></li>
                </ul>
            </nav>
        </header>
        `;
    }
    createFooter(): string {
        return `
        <footer class="footer">
            <div class="footer-container">
                <div class="footer-items">
                    <p class="footer-item">©</p>
                    <p class="footer-item">2022</p>
                    <a class="gh-logo" href=""></a>
                </div>
                <a class="rss-logo" href=""></a>
            </div>
       </footer>
        `;
    }
}

export default BasePage;
