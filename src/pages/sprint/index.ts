import API from '../../application/api';
import BaseGamePage from '../baseGamePage';
import { IWord, GameState, GameWordStatistic, ROUTES } from '../../utils/types';
import {shuffle, createHTMLElement, getAudioSvg, inRange, randomInt, randomIntRange} from '../../utils/helpers';
import { Constants } from '../../utils/constants';
 
class SprintPage extends BaseGamePage {
    
    words: IWord[] = [];
    wordIndex = -1;
    statistic: GameWordStatistic[] = [];
    gameState = GameState.StartScreen;
    group = -1;
    page = -1;
    answer:boolean;
    time: number;
   
    constructor(api: API) {
        super(api);
        this.answer = false;
        this.time = 60;
    };

    init(query: URLSearchParams): void {
        super.init(query);
    };

    gameName(): string {
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

    timer(){
        const setIntervalId = setInterval(() => {
            const timeSprint = document.querySelector('#sprint-time');
            if ((this.time >= 0) && timeSprint) {
                (timeSprint as HTMLElement).innerText = ` Time: ${this.time}`;
                this.time -= 1;
            } else {
                clearInterval(setIntervalId);
            }
            return this.time;
        }, 1000);
        return setIntervalId;
    }

    async renderSprintGame() {
        this.gameState = GameState.Question;
        const word = this.words[0];
        const randomWord = this.words[randomIntRange(0, 19)];
        if(word.id === randomWord.id) this.answer = true; 
        console.log(this.answer)
        const MAIN = document.querySelector('.main') as HTMLElement;
        MAIN.innerHTML = `<main class="sprint__main">
            <div class="sprint__timer" id="sprint-time">${this.timer()}</div>
            <div class="sprint__score"></div>
            <div class="sprint__word">${word.word}</div>
            <div class="sprint__translate">${randomWord.wordTranslate}</div>
            <button class="sprint__button" type="button"id="sprint-yes">Верно</button>
            <button class="sprint__button" type="button"id="sprint-no">Неверно</button>
        </main>`;
        
    }   
   
    endGame(): void {
        super.endGame();
    }
    

   /*


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
