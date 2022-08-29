import API from '../../application/api';
import BasePage from '../basePage';
import './index.css';

class AuthPage extends BasePage {
    isLogin = true;
    constructor(api: API) {
        super(api);
    }
    init(query: URLSearchParams) {
        super.init(query);
        const MAIN = document.querySelector('.main') as HTMLElement;
        MAIN.innerHTML = `<div class="root__auth">
            <div class="root__auth__buttons">
                <button class="root__auth__button root__auth__login">Войти</button>
                <button class="root__auth__button root__auth__reg">Регистрация</button>
            </div>
            <div class="root__auth__form"></div>
        </div>`;
        this.renderLogin();
        (document.querySelector('.root__auth__login') as HTMLElement).addEventListener('click', this.renderLogin);
        (document.querySelector('.root__auth__reg') as HTMLElement).addEventListener('click', this.renderReg);
    }
    renderReg() {
        (document.querySelector('.root__auth__login') as HTMLElement).classList.add('root__auth__button__active');
        (document.querySelector('.root__auth__reg') as HTMLElement).classList.remove('root__auth__button__active');
        this.isLogin = false;
        (document.querySelector('.root__auth__form') as HTMLElement).innerHTML = `
            <input placeholder="Имя" type="name" name="name" required="" class="root__auth__input root__auth__name">
            <input placeholder="E-mail" type="email" name="email" required="" class="root__auth__input root__auth__email">
            <input placeholder="Пароль" type="password" name="password" required="" class="root__auth__input root__auth__pass">
            <button class="root__auth__button__submit">Зарегистрироваться</button>
        `;
        (document.querySelector('.root__auth__button__submit') as HTMLElement).addEventListener('click', (e) =>
            this.regUser(e)
        );
    }
    renderLogin() {
        (document.querySelector('.root__auth__login') as HTMLElement).classList.remove('root__auth__button__active');
        (document.querySelector('.root__auth__reg') as HTMLElement).classList.add('root__auth__button__active');
        this.isLogin = true;
        (document.querySelector('.root__auth__form') as HTMLElement).innerHTML = `
            <input placeholder="E-mail" type="email" name="email" required="" class="root__auth__input root__auth__email">
            <input placeholder="Пароль" type="password" name="password" required="" class="root__auth__input root__auth__pass">
            <input type="button" class="root__auth__button__submit" value="Войти">
        `;
        (document.querySelector('.root__auth__button__submit') as HTMLElement).addEventListener('click', (e) =>
            this.regLogin(e)
        );
    }
    regUser(e: MouseEvent) {
        e.preventDefault();
        const email = (document.querySelector('.root__auth__email') as HTMLInputElement).value;
        const password = (document.querySelector('.root__auth__pass') as HTMLInputElement).value;
        console.log(email, password);
    }
    regLogin(e: MouseEvent) {
        e.preventDefault();
        const email = (document.querySelector('.root__auth__email') as HTMLInputElement).value;
        const password = (document.querySelector('.root__auth__pass') as HTMLInputElement).value;
        console.log(email, password);
    }
}

export default AuthPage;
