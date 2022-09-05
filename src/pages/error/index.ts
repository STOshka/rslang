import API from '../../application/api';
import BasePage from '../basePage';
import './error.css';

class ErrorPage extends BasePage {
    constructor(api: API) {
        super(api);
    }

    init(query: URLSearchParams) {
        super.init(query);
        const MAIN = document.querySelector('.main') as HTMLElement;
        MAIN.innerHTML = `
        <div class="error__background1">
            <div class="error__background2">
                <div class="error__wrapper">
                    <h3 class="error__text_title">Страница не существует...</h3>
                    <p class="error__text">
                        Возможно, она была перемещена или удалена, а может,<br>
                        Вы набрали что-то неправильное в адресной строке...
                    </p>
                    <a class="error__text_link" href="">Перейти на главную страницу</a>
                </div>
            </div>
        </div>
        `;
    }
}

export default ErrorPage;
