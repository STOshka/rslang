import { createHTMLElement } from '../../utils/helpers';

class Answer {
    index: number;
    text: string;
    isCorrect: boolean;
    node: HTMLElement;
    constructor(index: number, answer: string, isCorrect: boolean) {
        this.index = index;
        this.text = answer;
        this.isCorrect = isCorrect;
        this.node = this.generateNode();
    }
    generateNode(): HTMLElement {
        return createHTMLElement('div', 'audio__challenge__answer', `${this.index + 1}&nbsp&nbsp&nbsp${this.text}`);
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
