import API from '../application/api';
import { Constants } from '../utils/constants';
import { createHTMLElement, getAudioSvg, inRange, randomInt, shuffle } from '../utils/helpers';
import { GameState, IWord, GameWordStatistic, ROUTES } from '../utils/types';
import BasePage from './basePage';
import './statistics.css';

class BaseGamePage extends BasePage {
    words: IWord[] = [];
    wordIndex = -1;
    statistic: GameWordStatistic[] = [];
    gameState = GameState.StartScreen;
    group = -1;
    page = -1;
    constructor(api: API) {
        super(api);
    }
    createFooter(): string {
        return ``;
    }
    init(query: URLSearchParams) {
        super.init(query);
        this.page = inRange(
            parseInt(query.get('page') as string) as number,
            Constants.PAGE_PER_GROUP - 1,
            randomInt(Constants.PAGE_PER_GROUP)
        );
        this.group = inRange(parseInt(query.get('group') as string) as number, Constants.COUNT_GROUPS - 1, -1);
        if (this.group < 0) {
            this.chooseLevel();
        } else {
            this.generateGame();
        }
    }
    chooseLevel() {
        const MAIN = document.querySelector('.main') as HTMLElement;
        MAIN.innerHTML = `<main class="game__main">
            <div class="game__name">${this.gameName()}</div>
            <div class="game__groups__list">
                <div>Выберите уровень сложности слов</div>
                <div class="game__groups"></div>
            </div>
        </main>`;
        const GROUPS = MAIN.querySelector('.game__groups') as HTMLElement;
        new Array(Constants.COUNT_GROUPS).fill(null).forEach((el, ind) => {
            const group = createHTMLElement('div', 'game__group', `${ind + 1}`);
            group.addEventListener('click', () => {
                window.location.hash = window.location.hash + `?group=${ind}`;
            });
            GROUPS.append(group);
        });
    }
    gameName() {
        return `NO NAME`;
    }
    async generateGame() {
        const words = await this.api.getWordList(this.group, this.page);
        this.words = shuffle(words);
        this.statistic = [];
        this.gameState = GameState.StartScreen;
        this.wordIndex = -1;
    }
    async addWordstatistic(word: IWord, isCorrect: boolean) {
        const response = await this.api.getWordById(word._id);
        if (response.status === 404) {
            await this.api.createWordById(word._id);
        } else {
            const data = await response.json();
            if (data.optional) {
                data.optional.found += 1;
            }
            await this.api.updateWordById(word._id, data);
        }
        this.statistic = [...this.statistic, { word, isCorrect }];
    }
    playCurrentWordMusic() {
        const audio = new Audio(`${Constants.URL}${this.words[this.wordIndex].audio}`);
        audio.play();
    }
    endGame() {
        this.gameState = GameState.GameOver;
        const MAIN = document.querySelector('.main') as HTMLElement;
        MAIN.innerHTML = `<div>
            <div class="root__statistics__correct">
                <div class="root__statistics__span">
                    <span class="root__statistics__label">Ответили правильно:</span>
                    <span class="root__statistics__count">${this.statistic.filter((el) => el.isCorrect).length}</span>
                </div>
                <div class="root__statistics__correct__words"></div>
            </div>
            <div class="root__statistics__incorrect">
                <div class="root__statistics__span">
                    <span class="root__statistics__label">Ответили неправильно:</span>
                    <span class="root__statistics__count">${this.statistic.filter((el) => !el.isCorrect).length}</span>
                </div>
                <div class="root__statistics__incorrect__words"></div>
            </div>
            </div>
            <button class="root__statistics__return">Вернуться к учебнику</button>`;
        (MAIN.querySelector('.root__statistics__return') as HTMLElement).addEventListener('click', () => {
            window.location.hash = ROUTES.WORD_LIST + `?group=${this.group}`;
        });
        this.generateStatistic();
    }
    generateStatistic() {
        const CORRECT_WORDS = document.querySelector('.root__statistics__correct__words') as HTMLElement;
        const INCORRECT_WORDS = document.querySelector('.root__statistics__incorrect__words') as HTMLElement;
        this.statistic.forEach((el) => {
            const div = createHTMLElement('div', 'root__statistics__word');
            const audio = createHTMLElement('div', 'audio', getAudioSvg());
            div.append(audio);
            div.append(`${el.word.word} - ${el.word.wordTranslate}`);
            if (el.isCorrect) {
                CORRECT_WORDS.append(div);
            } else {
                INCORRECT_WORDS.append(div);
            }
            audio.addEventListener('click', () => {
                const audio = new Audio(`${Constants.URL}${el.word.audio}`);
                audio.play();
            });
        });
    }
}

export default BaseGamePage;
