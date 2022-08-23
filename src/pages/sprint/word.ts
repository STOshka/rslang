import { IWordsInf } from '../../utils/types';

export default class Word {
    template(word: IWordsInf, translation: IWordsInf): string {
        return `
    <div class="sprint__words_word" id="word">Word: ${word.word} </div>
    <div class="sprint__words_word" id="translate">Translate: ${translation.wordTranslate}</div>
    `;
    }
}
