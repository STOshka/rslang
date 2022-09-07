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
        MAIN.innerHTML = `
        <div class="home-background1">
            <div class="home-background2">
                <div class="home-text1-container">
                    <p class="home-text home-word" align="justify">В настоящее время английский язык проник во многие сферы жизнедеятельности.</p>
                    <ul>
                        <li class="home-text home-word">Ты хочешь иметь доступ к 80% мировой информации?</li>
                        <li class="home-text home-word">Смотреть сериалы сразу, а не ждать озвучку неделями?</li>
                        <li class="home-text home-word">Получить престижную работу?</li>
                    </ul>
                    <p class="home-text home-word"> Есть решение: приложение <b>RSLang</b></p>
                </div>
                    <div class="home-text2-container">
                    <p class="home-text home-word" align="justify">Здесь ты можешь изучать английский язык без скучных учебников.</p>        
                    <p class="home-text home-word" align="justify">Выбирай уровень сложности и изучай слова, играя в игры.
                    Если так и не удается запомнить какое-либо слово, добавь в "сложные" и повторяй его отдельно.
                    Так же, ты можешь отслеживать свои успехи в разделе "Статистика"!</p>
                    <q class="home-quote home-word">Сегодняшний специалист в чем-либо когда-то был новичком</q>
                    <cite class="home-autor home-word">Хелен Хейз</cite>
                </div>
            </div>
            <div class="team-link-container">
                <a href="#about" class="team-link">О команде</a>
            </div>
        </div>
        `;
    }
}

export default MainPage;
