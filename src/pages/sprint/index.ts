import API from '../../application/api';
import BaseGamePage from '../baseGamePage';
import { IWord, GameState, GameWordStatistic } from '../../utils/types';
import { shuffle, randomIntRange } from '../../utils/helpers';

class SprintPage extends BaseGamePage {
    words: IWord[] = [];
    wordIndex = -1;
    statistic: GameWordStatistic[] = [];
    gameState = GameState.StartScreen;
    group = -1;
    page = -1;
    answer: boolean;
    time: number;
    score: number;

    constructor(api: API) {
        super(api);
        this.answer = false;
        this.time = 60;
        this.score = 0;
    }

    init(query: URLSearchParams) {
        super.init(query);
    }

    gameName() {
        return 'СПРИНТ';
    }

    async generateGame() {
        const words = await this.api.getWordList(this.group, this.page);
        this.words = shuffle(words);
        this.statistic = [];
        //this.gameState = GameState.Question;
        this.renderSprintGame();
        this.wordIndex = -1;
    }

    timer() {
        const setIntervalId = setInterval(() => {
            const timeSprint = document.querySelector('#sprint-time');
            if (this.time >= 0 && timeSprint) {
                (timeSprint as HTMLElement).innerText = ` Time: ${this.time}`;
                this.time -= 1;
            } else {
                clearInterval(setIntervalId);
                this.endGame();
            }
            return this.time;
        }, 1000);
        return setIntervalId;
    }

    async renderSprintGame() {
        this.gameState = GameState.Question;
        const word = this.words[0];
        const randomWord = this.words[randomIntRange(0, 19)];
        if (word.id === randomWord.id) this.answer = true;
        const MAIN = document.querySelector('.main') as HTMLElement;
        MAIN.innerHTML = `<main class="sprint__main">
            <div class="sprint__timer" id="sprint-time">${this.timer()}</div>
            <div class="sprint__score">${this.score}</div>
            <div class="sprint__word">${word.word}</div>
            <div class="sprint__translate">${randomWord.wordTranslate}</div>
            <button class="sprint__button" type="button"id="sprint-yes">Верно</button>
            <button class="sprint__button" type="button"id="sprint-no">Неверно</button>
        </main>`;
        (MAIN.querySelector('#sprint-yes') as HTMLElement).addEventListener('click', () => {
            this.answerCheck(true, word);
            (MAIN.querySelector('.sprint__score') as HTMLElement).innerText = `${this.score}`;
        });
        (MAIN.querySelector('#sprint-no') as HTMLElement).addEventListener('click', () => {
            this.answerCheck(false, word);
            (MAIN.querySelector('.sprint__score') as HTMLElement).innerText = `${this.score}`;
        });
    }

    answerCheck(bthAnswer: boolean, word: IWord) {
        if (bthAnswer === this.answer) {
            super.addWordstatistic(word, true);
            this.score += 10;
        } else {
            super.addWordstatistic(word, false);
        }
    }

    endGame(): void {
        super.endGame();
    }
}

export default SprintPage;
