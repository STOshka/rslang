import API from '../../application/api';
import { Constants } from '../../utils/constants';
import { shuffle } from '../../utils/helpers';
import { IWordsInf } from '../../utils/types';
import BasePage from '../basePage';
import './index.css';

class AudioChallengePage extends BasePage {
    words: IWordsInf[] | undefined;
    correctAnswer = '';
    constructor(api: API) {
        super(api);
    }
    async init() {
        const BODY = document.querySelector('body') as HTMLElement;
        BODY.innerHTML = `<main class="audio__challenge__main">
            <div class="audio__challenge__svg">${this.getAudioSvg()}</div>
            <div class="audio__challenge__answers"></div>
            <div class="audio__challenge__button">I don't know</div>
        </main>`;
        this.words = await this.api.getWordList(0, 0);
        this.correctAnswer = this.words[0].wordTranslate;
        this.generateAnswers();
    }
    getAudioSvg(): string {
        return `<svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14
            3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
        </svg>`;
    }
    generateAnswers(): void {
        const possibleAnswers = this.words
            ?.filter((el) => el.wordTranslate !== this.correctAnswer)
            .map((el) => el.wordTranslate);
        if (possibleAnswers) {
            const answers = shuffle([
                this.correctAnswer,
                ...shuffle(possibleAnswers).slice(0, Constants.AUDIO_CHALLENGE_COUNT_ANSWERS - 1),
            ]);
            (document.querySelector('.audio__challenge__answers') as HTMLElement).innerHTML = answers
                .map((answer, index) => `<div class="audio__challenge__answer">${index + 1} ${answer}</div>`)
                .join('');
        }
    }
}

export default AudioChallengePage;
