import { Constants } from '../../utils/constants';
import { createHTMLElement } from '../../utils/helpers';
import { IWord } from '../../utils/types';
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
    }
    generateNode() {
        const node = createHTMLElement('div', 'word-container');
        node.innerHTML = `<div class="word-img-container">
                <img src="${Constants.URL}${this.word.image}" class="word-img">
            </div>
            <div class="word-text-container"> 
                <h4 class="word">${this.word.word}</h4>
                <div class="word-description-container"></div>
                <div class="translate-text-container"></div>
            </div>
            <div class="word-btns-container">
                <p class="word-btns-title">Voice:</p>
                <div class="word-btns-subcontainer">
                    <div class="word-btn word-sound-btn">${soundLogoSvg}</div>
                    <div class="word-btn word-stop-sound-btn">STOP</div>
                </div>
                <p class="word-btns-title">Translate:</p>
                <div class="word-btns-subcontainer">
                    <div class="word-btn word-translate">ON</div>
                </div>
                <p class="word-btns-title">Description:</p>
                <div class="word-btns-subcontainer">
                    <div class="word-btn word-description">ON</div>
                </div>
                <div class="word-btn word-btn-learned">Learned</div>
                <div class="word-btn word-btn-hard">Hard</div>
            </div>`;
        return node;
    }

    updateVisibleDescription(visible = false) {
        this.descriptionVisible = visible;
        (this.node.querySelector('.word-description-container') as HTMLElement).innerHTML = this.descriptionVisible
            ? `
        <p class="word-text word-meaning">${this.word.textMeaning}</p>
        <p class="word-text word-example">${this.word.textExample}</p>`
            : ``;
        (this.node.querySelector('.word-description') as HTMLElement).innerHTML = this.descriptionVisible
            ? 'ON'
            : 'OFF';
    }

    updateVisibleTranslate(visible = false) {
        this.translateVisible = visible;
        (this.node.querySelector('.translate-text-container') as HTMLElement).innerHTML = this.translateVisible
            ? `
            <h4 class="word-text-translate">${this.word.wordTranslate}</h4>
            <p class="word-text word-meaning-translate">${this.word.textMeaningTranslate}</p>
            <p class="word-text word-example-translate">${this.word.textExampleTranslate}</p>`
            : ``;
        (this.node.querySelector('.word-translate') as HTMLElement).innerHTML = this.translateVisible ? 'ON' : 'OFF';
    }
}
