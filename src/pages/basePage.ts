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
        return `<header class="header">HEADER</header>`;
    }
    createFooter(): string {
        return `<header class="footer">FOOTER</header>`;
    }
}

export default BasePage;
