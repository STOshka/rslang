import API from '../../application/api';
import { ISprintTranslate, IWordsInf } from '../../utils/types';

export default class SprintGame {
    readonly api: API;
    page: number;
    group: number;
    currentPage: number;
    randomIndex: number;
    arrLength: number;

    constructor(api: API) {
        this.api = api;
        this.group = 0;
        this.page = 0;
        this.currentPage = 0;
        this.randomIndex = 0;
        this.arrLength = 0;
    }

    wordsSelect(group: number, page: number): void {
        this.page = page;
        this.group = group;
        if (page) {
            this.currentPage = 0;
        }
        this.currentPage = 1;
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
}
