import API from '../../application/api';
import LocalStorage from '../../application/localStorage';
import { ROUTES } from '../../utils/types';
import BasePage from '../basePage';
import './index.css';

class AuthPage extends BasePage {
    constructor(api: API) {
        super(api);
    }
    init(query: URLSearchParams) {
        if (LocalStorage.instance.isAuth()) {
            window.location.hash = ROUTES.HOME_PAGE;
        }
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
        this.addButtonListener();
    }
    addButtonListener() {
        (document.querySelector('.root__auth') as HTMLElement).addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            const target = (e.target as HTMLElement).closest('button') as HTMLButtonElement;
            if (!target) return;
            const classListTarget = target.classList.toString();
            const actionButton: Record<string, () => void> = {
                'root__auth__button root__auth__login': () => this.renderLogin(),
                'root__auth__button root__auth__reg': () => this.renderReg(),
                root__auth__login__submit: () => this.loginUser(),
                root__auth__reg__submit: () => this.regUser(),
            };
            actionButton[classListTarget]?.();
        });
    }
    renderReg() {
        (document.querySelector('.root__auth__login') as HTMLElement).classList.remove('root__auth__button__active');
        (document.querySelector('.root__auth__reg') as HTMLElement).classList.add('root__auth__button__active');
        (document.querySelector('.root__auth__form') as HTMLElement).innerHTML = `
            <input placeholder="Имя" type="name" name="name" required="" class="root__auth__input root__auth__name">
            <input placeholder="E-mail" type="email" name="email" required="" class="root__auth__input root__auth__email">
            <input placeholder="Пароль" type="password" name="password" required="" class="root__auth__input root__auth__pass">
            <button class="root__auth__reg__submit">Зарегистрироваться</button>
        `;
    }
    renderLogin() {
        (document.querySelector('.root__auth__login') as HTMLElement).classList.add('root__auth__button__active');
        (document.querySelector('.root__auth__reg') as HTMLElement).classList.remove('root__auth__button__active');
        (document.querySelector('.root__auth__form') as HTMLElement).innerHTML = `
            <input placeholder="E-mail" type="email" name="email" required="" class="root__auth__input root__auth__email">
            <input placeholder="Пароль" type="password" name="password" required="" class="root__auth__input root__auth__pass">
            <button class="root__auth__login__submit">Войти</button>
        `;
    }
    async regUser() {
        const name = (document.querySelector('.root__auth__name') as HTMLInputElement).value;
        const email = (document.querySelector('.root__auth__email') as HTMLInputElement).value;
        const password = (document.querySelector('.root__auth__pass') as HTMLInputElement).value;
        try {
            const response = await this.api.createUser(name, email, password);
            if (response.status === 417) {
                throw new Error('user');
            }
            const answer = await response.json();
            if (answer.error) {
                throw new Error(answer.error.errors[0].path);
            }
            this.renderLogin();
            this.showMessage('Вы успешно создали аккаунт');
        } catch (error: unknown) {
            const e = (error as Error).message;
            const errorType: Record<string, string> = {
                email: 'Введите действительный e-mail',
                password: 'Длина пароля меньше 8 символов',
                user: 'Пользователь с таким e-mail существует',
            };
            this.showMessage(errorType[e]);
        }
    }
    async loginUser() {
        const email = (document.querySelector('.root__auth__email') as HTMLInputElement).value;
        const password = (document.querySelector('.root__auth__pass') as HTMLInputElement).value;
        try {
            const response = await this.api.loginUser(email, password);
            if (response.status === 403) {
                throw new Error('user');
            }
            const answer = await response.json();
            LocalStorage.instance.authUser(answer.userId, answer.token);
            window.location.hash = ROUTES.HOME_PAGE;
        } catch (error: unknown) {
            console.log((error as Error).message);
            this.showMessage('Неправильный e-mail или пароль');
        }
    }
    showMessage(message: string) {
        console.log(message);
    }
}

export default AuthPage;
