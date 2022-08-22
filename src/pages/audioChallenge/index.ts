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
    wordIndex = -1;
    correctAnswer: Answer | undefined;
    answered = true;
    constructor(api: API) {
        super(api);
    }
    async init(): Promise<void> {
        const BODY = document.querySelector('body') as HTMLElement;
        BODY.innerHTML = `<main class="audio__challenge__main">
            <div class="audio__challenge__svg">${getAudioSvg()}</div>
            <div class="audio__challenge__answers"></div>
            <div class="audio__challenge__button">I don't know</div>
        </main>`;
        (document.querySelector('.audio__challenge__svg') as HTMLElement).addEventListener('click', () => {
            const audio = new Audio(`${Constants.URL}${this.words[this.wordIndex].audio}`);
            audio.play();
        });
        (document.querySelector('.audio__challenge__answers') as HTMLElement).addEventListener('click', (e: Event) => {
            if (this.answered) return;
            const target: HTMLElement = (e.target as HTMLElement).closest('.audio__challenge__answer') as HTMLElement;
            const answer = this.answers.find((el) => el.node === target);
            answer && this.checkAnswer(answer);
        });
        (document.querySelector('.audio__challenge__button') as HTMLElement).addEventListener('click', () => {
            this.nextWord();
        });
        await this.generateWords();
        this.nextWord();
    }
    checkAnswer(answer: Answer): void {
        if (answer === this.correctAnswer) {
            answer.markAsCorrect();
        } else {
            answer.markAsIncorrect();
            this.correctAnswer?.markAsCorrect();
        }
        (document.querySelector('.audio__challenge__button') as HTMLElement).innerHTML = '-->';
        this.answered = true;
    }
    async generateWords(): Promise<void> {
        const words = await this.api.getWordList(0, 0);
        this.words = shuffle(words);
    }
    nextWord(): void {
        if (this.words && this.wordIndex < this.words.length - 1) {
            this.wordIndex += 1;
            const correctAnswer = this.words[this.wordIndex].wordTranslate;
            const possibleAnswers = this.words
                .filter((el) => el.wordTranslate !== correctAnswer)
                .map((el) => el.wordTranslate);
            this.answers = shuffle([
                correctAnswer,
                ...shuffle(possibleAnswers).slice(0, Constants.AUDIO_CHALLENGE_COUNT_ANSWERS - 1),
            ]).map((answer, index) => new Answer(index, answer, answer === correctAnswer));
            const answersDiv = document.querySelector('.audio__challenge__answers') as HTMLElement;
            answersDiv.innerHTML = '';
            this.answers.forEach((answer) => answersDiv.append(answer.node));
            this.correctAnswer = this.answers.find((el) => el.isCorrect);
            this.answered = false;
            (document.querySelector('.audio__challenge__button') as HTMLElement).innerHTML = `I don't know`;
        }
    }
}

export default AudioChallengePage;
