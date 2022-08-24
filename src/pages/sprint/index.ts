import API from '../../application/api';
import { IWordsInf } from '../../utils/types';
import BasePage from '../basePage';
import SprintButton from './sprintButton';
import Timer from './timer';

class SprintPage extends BasePage {
    sprintButton: SprintButton;
    timer: Timer;
    group: number;
    value: number;
    page: number;
    arrLength: number;
    score: string;
    wordNew: string | HTMLDivElement;
    point: number;
    result: string;
    answer: boolean;

    constructor(api: API) {
        super(api);
        this.sprintButton = new SprintButton();
        this.timer = new Timer();
        this.group = 0;
        this.value = 0;
        this.page = 0;
        this.arrLength = 0;
        this.score = '';
        this.wordNew = '';
        this.point = 0;
        this.result = '';
        this.answer = false;
    }

    async init() {
        const BODY = document.querySelector('body') as HTMLElement;
        BODY.innerHTML = `
        <main class="sprint-main"> 
        ${this.renderStartPage()}
            <div class="sprint__game">
                    <div class="sprint__game_header sprint__header">
                        <div class="sprint__header_time" id="sprint-time">Time: ${this.timer.setIntervalId} </div>
                        <div class="sprint__header_score" id="sprint-score">Score: 0</div>
                    </div>
                    <div class="sprint__options_points sprint__points"></div>
                    <div class="sprint__game_main sprint__main">
                        <div class="sprint__main_words sprint__words" id="sprint-words">${await this.renderWord()}</div>
                        <div class="sprint__main_buttons sprint__buttons">${this.sprintButton.template}</div>
                </div>
            </div>
        </main>`;
    }

    renderStartPage() {
        return `
        <div class="sprint__container">
          <div class="sprint__start">
            <h3 class="sprint__start_title">Sprint</h3>
            <select class="sprint__category" name="sprint-category" id="sprint-category">${this.setCategory()}</select>
            <button class="sprint__start_button" id="sprint-start-button" onclick="${this.clickButtonStart()}">Ok</button>
          </div>
        </div>`;
    }

    setCategory() {
        const categories = [0, 1, 2, 3, 4, 5];
        categories.forEach((category) => {
            this.value = category + 1;
            this.result += `<option class="sprint__category_option" value="${this.value}">${this.value}</option>`;
        });
        return this.result;
    }

    mixWords(array: IWordsInf[]): IWordsInf[] {
        const copyArr = array.slice();
        this.arrLength = copyArr.length;
        function rec(num: number) {
            if (num > 0) {
                const sort: number = Math.floor(Math.random() * num);
                rec(num - 1);
                const element = copyArr[num];
                copyArr[num] = copyArr[sort];
                copyArr[sort] = element;
            }
        }
        rec(this.arrLength - 1);
        return copyArr;
    }

    async clickButtonStart() {
        this.group = this.value - 1;
        const arrayWord: Promise<IWordsInf[]> = await this.api.getWordList(this.group, 0);
        return await arrayWord;
    }

    async renderWord() {
        const mixWord = this.mixWords(await this.clickButtonStart());
        const random = Math.ceil(Math.random() * 18);
        const elementWord = mixWord[1];
        const wordRes = elementWord.word;
        const elementTranslate = mixWord[random];
        const elemTransRes = elementTranslate.wordTranslate;
        return `
        <div class="sprint__words_word" id="word">Word: ${wordRes} </div>
        <div class="sprint__words_word" id="translate">Translate: ${elemTransRes}</div>
        `;
    }

    addAnswerYes(right: IWordsInf[], info?: IWordsInf) {
        const sprintScore = document.querySelector('#sprint-score') as Element;
        this.score = sprintScore.innerHTML;
        const baseBill = 10;
        if (info) {
            right[right.length] = info;
            this.score = String(baseBill + Number(this.score));
            sprintScore.classList.add('active');
        }
    }

    addAnswerNo(wrong: IWordsInf[], info?: IWordsInf) {
        if (info) {
            wrong[wrong.length] = info;
        }
    }
}

export default SprintPage;
