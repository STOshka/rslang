import { Constants } from '../../utils/constants';
import { createHTMLElement, getAudioSvg } from '../../utils/helpers';
import { WordStatictic, WordStatus } from '../../utils/types';
import './index.css';

class GameStatictic {
    statictic: WordStatictic[];
    node: HTMLElement;
    constructor(statictic: WordStatictic[]) {
        this.statictic = statictic;
        this.node = this.generateNode();
        this.generateStatictic();
    }
    generateNode() {
        const div = createHTMLElement('div');

        div.innerHTML = `
            <div class="root__statictics__correct">
                <div class="root__statictics__span">
                    <span class="root__statictics__label">Ответили правильно:</span>
                    <span class="root__statictics__count">${
                        this.statictic.filter((el) => el.status === WordStatus.CORRECT).length
                    }</span>
                </div>
                <div class="root__statictics__correct__words"></div>
            </div>
            <div class="root__statictics__incorrect">
                <div class="root__statictics__span">
                    <span class="root__statictics__label">Ответили неправильно:</span>
                    <span class="root__statictics__count">${
                        this.statictic.filter((el) => el.status === WordStatus.INCORRECT).length
                    }</span>
                </div>
                <div class="root__statictics__incorrect__words"></div>
            </div>`;
        return div;
    }
    generateStatictic() {
        const CORRECT_WORDS = this.node.querySelector('.root__statictics__correct__words') as HTMLElement;
        const INCORRECT_WORDS = this.node.querySelector('.root__statictics__incorrect__words') as HTMLElement;
        this.statictic.forEach((el) => {
            const div = createHTMLElement('div', 'root__statictics__word');
            const audio = createHTMLElement('div', 'audio', getAudioSvg());
            div.append(audio);
            div.append(`${el.word.word} - ${el.word.wordTranslate}`);
            if (el.status === WordStatus.CORRECT) {
                CORRECT_WORDS.append(div);
            } else {
                INCORRECT_WORDS.append(div);
            }
            audio.addEventListener('click', () => {
                const audio = new Audio(`${Constants.URL}${el.word.audio}`);
                audio.play();
            });
        });
    }
    getNode() {
        return this.node;
    }
}

export default GameStatictic;
