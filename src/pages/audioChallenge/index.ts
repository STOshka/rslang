import API from '../../application/api';
import { Constants } from '../../utils/constants';
import { getAudioSvg, shuffle } from '../../utils/helpers';
import { IWordsInf } from '../../utils/types';
import BasePage from '../basePage';
import Answer from './answer';
import './index.css';

class AudioChallengePage extends BasePage {
    words: IWordsInf[] = [];
    answers: Answer[] = [];
    correctAnswer: Answer | undefined;
    answered = true;
    constructor(api: API) {
        super(api);
    }
    async init() {
        const BODY = document.querySelector('body') as HTMLElement;
        BODY.innerHTML = `<main class="audio__challenge__main">
            <div class="audio__challenge__svg">${getAudioSvg()}</div>
            <div class="audio__challenge__answers"></div>
            <div class="audio__challenge__button">I don't know</div>
        </main>`;
        (document.querySelector('.audio__challenge__answers') as HTMLElement).addEventListener('click', (e: Event) => {
            if (this.answered) return;
            const target: HTMLElement = (e.target as HTMLElement).closest('.audio__challenge__answer') as HTMLElement;
            const answer = this.answers.find((el) => el.node === target);
            answer && this.checkAnswer(answer);
        });
        this.generateWord();
    }
    checkAnswer(answer: Answer) {
        if (answer === this.correctAnswer) {
            answer.markAsCorrect();
        } else {
            answer.markAsIncorrect();
            this.correctAnswer?.markAsCorrect();
        }
        (document.querySelector('.audio__challenge__button') as HTMLElement).innerHTML = '-->';
        this.answered = true;
    }
    async generateWord(): Promise<void> {
        (document.querySelector('.audio__challenge__button') as HTMLElement).innerHTML = `I don't know`;
        this.words = await this.api.getWordList(0, 0);
        const correctAnswer = this.words[0].wordTranslate;
        const possibleAnswers = this.words
            .filter((el) => el.wordTranslate !== correctAnswer)
            .map((el) => el.wordTranslate);
        if (possibleAnswers) {
            this.answers = shuffle([
                correctAnswer,
                ...shuffle(possibleAnswers).slice(0, Constants.AUDIO_CHALLENGE_COUNT_ANSWERS - 1),
            ]).map((answer, index) => new Answer(index, answer, answer === correctAnswer));
            const answersDiv = document.querySelector('.audio__challenge__answers') as HTMLElement;
            this.answers.forEach((answer) => answersDiv.append(answer.node));
            this.correctAnswer = this.answers.find((el) => el.isCorrect);
            this.answered = false;
        }
    }
}

export default AudioChallengePage;
