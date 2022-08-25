import API from '../../application/api';
import BaseGamePage from '../baseGamePage';
import { IWord, GameState, GameWordStatistic, ROUTES } from '../../utils/types';
import Timer from './timer';
import {shuffle, createHTMLElement, getAudioSvg, inRange, randomInt} from '../../utils/helpers';
import { Constants } from '../../utils/constants';
 
class SprintPage extends BaseGamePage {
    
   timer: Timer;
    words: IWord[] = [];
    wordIndex = -1;
    statistic: GameWordStatistic[] = [];
    gameState = GameState.StartScreen;
    group = -1;
    page = -1;
   
    constructor(api: API) {
        super(api);
        this.timer = new Timer();
    };

    init(query: URLSearchParams) {
        super.init(query);
    };

    gameName() {
        return 'СПРИНТ'; 
    };

    async generateGame() {
        const words = await this.api.getWordList(this.group, this.page);
        this.words = shuffle(words);
        this.statistic = [];
        //this.gameState = GameState.Question;
        this.renderSprintGame();
        this.wordIndex = -1;
    }

    renderSprintGame() {
        this.gameState = GameState.Question;
        const MAIN = document.querySelector('.main') as HTMLElement;
        MAIN.innerHTML = `<main class="sprint__main">
            <div class="sprint__timer" id="sprint-time">${this.timer.setIntervalId}</div>
            <div class="sprint__score"></div>
            <div class="sprint__word"></div>
            <div class="sprint__translate"></div>
            <button class="sprint__button" type="button"id="sprint-yes">Верно</button>
            <button class="sprint__button" type="button"id="sprint-no">Неверно</button>
        </main>`;

    }
    
   
    endGame(): void {
        super.endGame();
    }
    

   /*

   
    async renderWord() {
        const mixWord = this.mixWords(await this.clickButtonStart());
        const random = Math.ceil(Math.random() * 19);
        const elementWord = mixWord[0];
        const wordRes = elementWord.word;
        const elementTranslate = mixWord[random];
        const elemTransRes = elementTranslate.wordTranslate;
        if (elementWord.id === elementTranslate.id) this.answer = true;
        this.answer = false;
        return `
        <div class="sprint__words_word" id="word">Word: ${wordRes} </div>
        <div class="sprint__words_word" id="translate">Translate: ${elemTransRes}</div>
        `;
    }

    async addAnswerYes(right: IWordsInf[], info?: IWordsInf) {
        const baseBill = 10;
        if (info) {
            right[right.length] = info;
            this.score = String(baseBill + Number(this.score));
        }
    }

    addAnswerNo(wrong: IWordsInf[], info?: IWordsInf) {
        if (info) {
            wrong[wrong.length] = info;
        }
    }*/
}

export default SprintPage;
