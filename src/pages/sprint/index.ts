// import API from '../../application/api';
// import BaseGamePage from '../baseGamePage';

// class SprintPage extends BaseGamePage {

// import { IWordsInf } from '../../utils/types';
// import BasePage from '../basePage';
// import Timer from './timer';

// class SprintPage extends BasePage {
//     timer: Timer;
//     group: number;
//     value: number;
//     page: number;
//     arrLength: number;
//     score: string;
//     wordNew: string | HTMLDivElement;
//     point: number;
//     result: string;
//     answer: boolean;
//     right: IWordsInf[];
//     wrong: IWordsInf[];
//     count: number;

//     constructor(api: API) {
//         super(api);
//         this.timer = new Timer();
//         this.group = 0;
//         this.value = 0;
//         this.page = 0;
//         this.arrLength = 0;
//         this.score = '';
//         this.wordNew = '';
//         this.point = 0;
//         this.count = 0;
//         this.result = '';
//         this.answer = false;
//         this.right = [];
//         this.wrong = [];
//     }
//     init(query: URLSearchParams) {
//         super.init(query);
//         const MAIN = document.querySelector('.main') as HTMLElement;
//         MAIN.innerHTML = 'SPRINT';

//     async init() {
//         const BODY = document.querySelector('body') as HTMLElement;
//         BODY.innerHTML = `
//         <main class="sprint-main"> 
//         ${this.renderStartPage()}
//             <div class="sprint__game">
//                     <div class="sprint__game_header sprint__header">
//                         <div class="sprint__header_time" id="sprint-time">Time: ${this.timer.setIntervalId} </div>
//                         <div class="sprint__header_score" id="sprint-score">Score: ${this.score}</div>
//                     </div>
//                     <div class="sprint__options_points sprint__points"></div>
//                     <div class="sprint__game_main sprint__main">
//                         <div class="sprint__main_words sprint__words" id="sprint-words">${await this.renderWord()}</div>
//                         <div class="sprint__main_buttons sprint__buttons" id="button-answer">${this.renderButton()}</div>
//                 </div>
//             </div>
//         </main>`;
//     }

//     renderStartPage() {
//         return `
//         <div class="sprint__container">
//           <div class="sprint__start">
//             <h3 class="sprint__start_title">Sprint</h3>
//             <select class="sprint__category" name="sprint-category" id="sprint-category">${this.setCategory()}</select>
//             <button class="sprint__start_button" id="sprint-start-button" onclick="${this.clickButtonStart()}">Ok</button>
//           </div>
//         </div>`;
//     }

//     renderButton() {
//         return `
//             <button type="button" class="sprint__button" id="sprint-yes">Yes</button>
//             <button type="button" class="sprint__button" id="sprint-no">No</button>
//         `;
//     }

//     setCategory() {
//         const categories = [0, 1, 2, 3, 4, 5];
//         categories.forEach((category) => {
//             this.value = category + 1;
//             this.result += `<option class="sprint__category_option" value="${this.value}">${this.value}</option>`;
//         });
//         return this.result;
//     }

//     mixWords(array: IWordsInf[]): IWordsInf[] {
//         const copyArr = array.slice();
//         this.arrLength = copyArr.length;
//         function rec(num: number) {
//             if (num > 0) {
//                 const sort: number = Math.floor(Math.random() * num);
//                 rec(num - 1);
//                 const element = copyArr[num];
//                 copyArr[num] = copyArr[sort];
//                 copyArr[sort] = element;
//             }
//         }
//         rec(this.arrLength - 1);
//         return copyArr;
//     }

//     async clickButtonStart() {
//         this.group = this.value - 1;
//         const arrayWord: Promise<IWordsInf[]> = await this.api.getWordList(this.group, 0);
//         return await arrayWord;
//     }

//     async renderWord() {
//         const mixWord = this.mixWords(await this.clickButtonStart());
//         const random = Math.ceil(Math.random() * 19);
//         const elementWord = mixWord[0];
//         const wordRes = elementWord.word;
//         const elementTranslate = mixWord[random];
//         const elemTransRes = elementTranslate.wordTranslate;
//         if (elementWord.id === elementTranslate.id) this.answer = true;
//         this.answer = false;
//         return `
//         <div class="sprint__words_word" id="word">Word: ${wordRes} </div>
//         <div class="sprint__words_word" id="translate">Translate: ${elemTransRes}</div>
//         `;
//     }

//     async addAnswerYes(right: IWordsInf[], info?: IWordsInf) {
//         const baseBill = 10;
//         if (info) {
//             right[right.length] = info;
//             this.score = String(baseBill + Number(this.score));
//         }
//     }

//     addAnswerNo(wrong: IWordsInf[], info?: IWordsInf) {
//         if (info) {
//             wrong[wrong.length] = info;
//         }
//     }
// }

// export default SprintPage;
