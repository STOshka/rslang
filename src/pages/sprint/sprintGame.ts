import API from '../../application/api';
import { ISprintTranslate, IWordsInf } from '../../utils/types';

export default class SprintGame {
    readonly api: API;
    page: number;
    group: number;
    currentPage: number;
    randomIndex: number;
    arrLength: number;
    score: string;

    constructor(api: API) {
        this.api = api;
        this.group = 0;
        this.page = 0;
        this.currentPage = 0;
        this.randomIndex = 0;
        this.arrLength = 0;
        this.score = '';
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
        rec(this.arrLength);
        return copyArr;
    }

    mixTranslation(arr: IWordsInf[]) {
        return arr.map((word, index) => {
            const wordForGame = { ...word } as ISprintTranslate;
            if (Math.random() > 0.5) {
                wordForGame.answer = true;
                wordForGame.gameTranslate = wordForGame.wordTranslate;
            } else {
                this.randomIndex = index;
                if (this.randomIndex === index) {
                    this.randomIndex = Math.floor(Math.random() * arr.length);
                }
                wordForGame.answer = false;
                wordForGame.gameTranslate = arr[this.randomIndex].wordTranslate;
            }
            return wordForGame;
        });
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

    drawWords(word: IWordsInf, wordTranslate: IWordsInf) {
        const sprintWord = document.querySelector('#word') as Element;
        const sprintTranslate = document.querySelector('#translate') as Element;

        sprintWord.innerHTML = word.word;
        sprintTranslate.innerHTML = wordTranslate.wordTranslate;
    }
}
