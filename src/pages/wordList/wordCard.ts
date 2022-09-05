import Authorization from '../../application/auth';
import { Constants } from '../../utils/constants';
import { createHTMLElement } from '../../utils/helpers';
import { IWord, WordDifficulty } from '../../utils/types';
import { soundLogoSvg } from './templates-html';

export class WordCard {
    word: IWord;
    translateVisible = true;
    descriptionVisible = true;
    node: HTMLElement;
    constructor(word: IWord) {
        this.word = word;
        this.node = this.generateNode();
        this.updateVisibleTranslate(true);
        this.updateVisibleDescription(true);
        this.generateDifficulty();
    }
    generateNode() {
        const node = createHTMLElement('div', 'word-container');
        node.innerHTML = `<div class="word-img-container">
                <img src="${Constants.URL}${this.word.image}" class="word-img">
            </div>
            <div class="word-text-container"> 
                <div>
                    <h4 class="word">${this.word.word}</h4>
                    <div class="word-transcription">${this.word.transcription}</div>
                </div>
                <div class="word-description-container"></div>
                <div class="translate-text-container"></div>
                ${this.generateUserStat()}
            </div>
            <div class="word-btns-container">${this.generateBtn()}
            </div>`;
        return node;
    }
    generateUserStat() {
        if (
            !Authorization.instance.isAuth() ||
            !this.word.userWord?.optional ||
            !Boolean(this.word.userWord.optional.found)
        ) {
            return ``;
        }
        return `Количество правильных ответов: 
                ${this.word.userWord.optional.correct} из ${this.word.userWord.optional.found}.`;
    }
    generateBtn() {
        return `<p class="word-btns-title">Звук:</p>
        <div class="word-btns-subcontainer">
            <div class="word-btn word-sound-btn">${soundLogoSvg}</div>
            <div class="word-btn word-stop-sound-btn">❚❚</div>
        </div>
        <div class="word-btn word-description">Значение ВЫКЛ</div>
        <div class="word-btn word-translate">Перевод ВЫКЛ</div>
        
        ${this.generateBtnAuth()}`;
    }
    generateBtnAuth() {
        return Authorization.instance.isAuth()
            ? `<div class="word-btn word-btn-learned">Изученное</div>
        <div class="word-btn word-btn-hard">Сложное</div>
        <div class="word-indicator"></div>
        `
            : ``;
    }
    generateDifficulty(difficulty: string = this.word.userWord?.difficulty as string) {
        this.node.classList.remove(`word-container-${WordDifficulty.learning}`);
        this.node.classList.remove(`word-container-${WordDifficulty.hard}`);
        if (difficulty === WordDifficulty.learning) {
            this.node.classList.add(`word-container-${WordDifficulty.learning}`);
        }
        if (difficulty === WordDifficulty.hard) {
            this.node.classList.add(`word-container-${WordDifficulty.hard}`);
        }
    }
    updateVisibleDescription(visible = false) {
        this.descriptionVisible = visible;
        (this.node.querySelector('.word-description-container') as HTMLElement).innerHTML = this.descriptionVisible
            ? `
        <p class="word-text word-meaning">${this.word.textMeaning}</p>
        <p class="word-text word-example">${this.word.textExample}</p>`
            : ``;
        (this.node.querySelector('.word-description') as HTMLElement).innerHTML = this.descriptionVisible
            ? 'Значение ВЫКЛ'
            : 'Значение ВКЛ';
    }

    updateVisibleTranslate(visible = false) {
        this.translateVisible = visible;
        (this.node.querySelector('.translate-text-container') as HTMLElement).innerHTML = this.translateVisible
            ? `
            <h4 class="word-text-translate">${this.word.wordTranslate}</h4>
            <p class="word-text word-meaning-translate">${this.word.textMeaningTranslate}</p>
            <p class="word-text word-example-translate">${this.word.textExampleTranslate}</p>`
            : ``;
        (this.node.querySelector('.word-translate') as HTMLElement).innerHTML = this.translateVisible ? 'Перевод ВЫКЛ' : 'Перевод ВКЛ';
    }
}
