import { createHTMLElement } from '../../utils/helpers';

class Answer {
    answer: string;
    isCorrect: boolean;
    node: HTMLElement;
    index: number;
    constructor(index: number, answer: string, isCorrect: boolean) {
        this.index = index;
        this.answer = answer;
        this.isCorrect = isCorrect;
        this.node = this.generateNode();
    }
    generateNode(): HTMLElement {
        return createHTMLElement('div', 'audio__challenge__answer', `${this.index + 1} ${this.answer}`);
    }
    markAnswer(type: string) {
        this.node.classList.add(type);
    }
    markAsCorrect() {
        this.markAnswer('correct');
    }
    markAsIncorrect() {
        this.markAnswer('incorrect');
    }
}

export default Answer;
