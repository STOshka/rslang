import API from '../../application/api';
import BasePage from '../basePage';

class ErrorPage extends BasePage {
    constructor(api: API) {
        super(api);
    }

    init(query: URLSearchParams) {
        super.init(query);
        const MAIN = document.querySelector('.main') as HTMLElement;
        MAIN.innerHTML = `<div class="error__container">
            <div class="error__wrapper">
                <img src="./assets/error.png" alt="error-page" class="error__img">
            </div>
            <div class="error__wrapper">
                <h3 class="error__text_title">Страница не существует</h3>
                <p class="error__text">Возможно, она была перемещена или удалена, а может, Вы набрали что-то неправильное в адресной строке.</p>
                <p class="error__text_link"><a href="">Перейти на главную страницу</a></p>
            </div>
        </div>`;
    }
}

export default ErrorPage;
