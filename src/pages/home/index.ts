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
        MAIN.innerHTML = `<div class="home-background1">
            <div class="home-background2">
                <div class="home-text1">
                    <p class="text word" align="justify">В настоящее время английский язык проник во многие сферы жизнедеятельности.</p>
                    <ul>
                        <li class="text word">Ты хочешь иметь доступ к 80% мировой информации?</li>
                        <li class="text word">Смотреть сериалы сразу, а не ждать озвучку неделями?</li>
                        <li class="text word">Получить престижную работу?</li>
                    </ul>
                    <p class="text word"> Есть решение: приложение <b>RSLang</b></p>
                </div>
                    <div class="home-text2">
                    <p class="text word" align="justify">Здесть ты можешь изучать английский язык без скучных учебников.</p>        
                    <p class="text word" align="justify">Выбирай уровень сложности и изучай слова, играя в игры.
                    Если так и не удается запомнить какое-либо слово, добавь в "сложные" и повторяй его отдельно.
                    Так же, ты можешь отслеживать свои успехи в разделе "Статистика"!</p>
                    <q class="quote word">Сегодняшний специалист в чем-либо когда-то был новичком</q>
                    <cite class="autor word">Хелен Хейз</cite>
                </div>
                <div class="team-link-container">
                    <a href="#about" class="team-link">О команде</a>
                </div>
            </div>
        </div>`;
    }
}

export default MainPage;
