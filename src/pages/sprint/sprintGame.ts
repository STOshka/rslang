import API from '../../application/api';
import { IWordsInf } from '../../utils/types';
import Word from './word';

export default class SprintGame {
    readonly api: API;
    arrLength: number;
    score: string;

    word: Word;
    translateNumber: number;
    wordNew: string | HTMLDivElement;
    point: number;

    constructor(api: API) {
        this.api = api;
        this.arrLength = 0;
        this.score = '';
        this.word = new Word();
        this.translateNumber = 0;
        this.wordNew = '';
        this.point = 0;
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

    mixTranslation(count: number, arr: IWordsInf[]) {
        const wordCount = count;
        const random = Math.random();
        const partThird = 0.333;
        if (random > partThird) {
            this.translateNumber = wordCount;
        } else {
            this.translateNumber = Math.ceil(Math.random() * arr.length);
        }
        const wrapper = document.querySelector('#sprint-words') as HTMLElement;
        wrapper.innerHTML = '';
        if (arr[wordCount]) {
            this.wordNew = (this.word.template(arr[wordCount], arr[this.translateNumber]) as unknown) as HTMLDivElement;
        } else {
            return false;
        }
        wrapper.appendChild(this.wordNew);
        if (this.translateNumber === wordCount) {
            return true;
        }
        return false;
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
