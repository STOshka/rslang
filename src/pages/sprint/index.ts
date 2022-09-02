import API from '../../application/api';
import BaseGamePage from '../baseGamePage';
import { IWord, GameState } from '../../utils/types';
import { shuffle, randomInt } from '../../utils/helpers';
import './circles.css';

class SprintPage extends BaseGamePage {
    game_name = 'sprint';
    isCorrect = false;
    time = 60;
    constructor(api: API) {
        super(api);
    }
    gameName() {
        return 'СПРИНТ';
    }
    async generateGame(): Promise<void> {
        await super.generateGame();
        this.renderSprintGame();
        this.nextWord();
    }
    timer() {
        const setIntervalId = setInterval(() => {
            const timeSprint = document.querySelector('#sprint-time');
            if (this.time >= 0 && timeSprint) {
                (timeSprint as HTMLElement).innerText = `Время: ${this.time}`;
                this.time -= 1;
            } else {
                clearInterval(setIntervalId);
                this.endGame();
            }
            return this.time;
        }, 1000);
        return setIntervalId;
    }
    nextWord() {
        this.wordIndex = (this.wordIndex + 1) % this.words.length;
        const answerTranslate = document.querySelector('.sprint__translate') as HTMLElement;
        this.isCorrect = Boolean(randomInt(2));
        const wordRandom = this.isCorrect
            ? this.words[this.wordIndex]
            : shuffle(this.words.filter((word) => word !== this.words[this.wordIndex]))[0];
        answerTranslate.innerText = `${wordRandom.wordTranslate}`;
        const answerWord = document.querySelector('.sprint__word') as HTMLElement;
        answerWord.innerText = `${this.words[this.wordIndex].word}`;
    }
    renderSprintGame() {
        this.gameState = GameState.Question;
        const MAIN = document.querySelector('.main') as HTMLElement;
        MAIN.innerHTML = `<main class="sprint__main">
            <div class="sprint__timer" id="sprint-time">${this.timer()}</div>
            <div class="sprint__score">${this.score}</div>
            <div class="sprint__score_points">${this.addSpans()}</div>
            <div class="sprint__word"></div>
            <div class="sprint__translate"></div>
            <button class="sprint__button" type="button"id="sprint-yes">Верно</button>
            <button class="sprint__button" type="button"id="sprint-no">Неверно</button>
        </main>`;
        (MAIN.querySelector('#sprint-yes') as HTMLElement).addEventListener('click', () => {
            this.checkAnswer(true, this.words[this.wordIndex] as IWord);
            this.addStyleBtn('#sprint-yes', '#sprint-no', 'active-button');
        });
        (MAIN.querySelector('#sprint-no') as HTMLElement).addEventListener('click', () => {
            this.checkAnswer(false, this.words[this.wordIndex] as IWord);
            this.addStyleBtn('#sprint-no', '#sprint-yes', 'active-button');
        });
        this.answerKey(this.words[this.wordIndex] as IWord);
    }
    addStyleBtn(idAdd: string, idRemove: string, style: string) {
        (document.querySelector(idAdd) as HTMLElement).classList.add(style);
        (document.querySelector(idRemove) as HTMLElement).classList.remove(style);
    }
    addSpans() {
        return `<span class="circles" id="circle1"></span>
        <span class="circles" id="circle2"></span>
        <span class="circles" id="circle3"></span>
        <span class="points">+${this.getPoints()}</span>`;
    }
    getPoints() {
        const points = [10, 20, 40, 80];
        const level = Math.min(Math.floor(this.correctStreak / 4), 3);
        return points[level];
    }
    addStyle() {
        const bill = this.correctStreak > 12 ? 0 : this.correctStreak % 4;
        const span1 = document.querySelector('#circle1') as HTMLElement;
        const span2 = document.querySelector('#circle2') as HTMLElement;
        const span3 = document.querySelector('#circle3') as HTMLElement;
        span1.classList.remove('active');
        span2.classList.remove('active');
        span3.classList.remove('active');
        if (bill > 0) {
            span1.classList.add('active');
        }
        if (bill > 1) {
            span2.classList.add('active');
        }
        if (bill > 2) {
            span3.classList.add('active');
        }
    }
    checkAnswer(bthAnswer: boolean, word: IWord) {
        super.addWordStatistic(word, bthAnswer === this.isCorrect, this.getPoints());
        const score = document.querySelector('.sprint__score') as HTMLElement;
        const point = document.querySelector('.points') as HTMLElement;
        this.getPoints();
        this.addStyle();
        point.innerText = `+${this.getPoints()}`;
        score.innerText = `${this.score}`;
        this.nextWord();
    }
    answerKey(word: IWord) {
        (document.querySelector('body') as HTMLElement).addEventListener('keydown', (event) => {
            const score = document.querySelector('.sprint__score') as HTMLElement;
            const keyName = event.key;
            if (keyName === 'ArrowLeft') {
                this.addStyleBtn('#sprint-yes', '#sprint-no', 'active-button');
                return this.checkAnswer(true, word);
            }
            if (keyName === 'ArrowRight') {
                this.addStyleBtn('#sprint-no', '#sprint-yes', 'active-button');
                return this.checkAnswer(false, word);
            }
            score.innerText = `${this.score}`;
        });
    }
}

export default SprintPage;
