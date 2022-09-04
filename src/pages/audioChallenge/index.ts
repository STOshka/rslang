import API from '../../application/api';
import { Constants } from '../../utils/constants';
import { getAudioSvg, shuffle } from '../../utils/helpers';
import { GameState } from '../../utils/types';
import BaseGamePage from '../baseGamePage';
import Answer from './answer';
import './index.css';

const I_DONT_KNOW = 'Я не знаю!';

class AudioChallengePage extends BaseGamePage {
    game_name = 'audiochallenge';
    answers: Answer[] = [];
    constructor(api: API) {
        super(api);
    }
    gameName(): string {
        return `АУДИОВЫЗОВ`;
    }
    async generateGame(): Promise<void> {
        await super.generateGame();
        this.renderWord();
        this.nextWord();
    }
    nextWord(): void {
        if (this.gameState !== GameState.Answer && this.gameState !== GameState.StartScreen) return;
        if (this.wordIndex < this.words.length - 1) {
            this.wordIndex += 1;
            const correctTranslate = this.words[this.wordIndex].wordTranslate;
            const possibleAnswers = this.words
                .filter((el) => el.wordTranslate !== correctTranslate)
                .map((el) => el.wordTranslate);
            this.answers = shuffle([
                correctTranslate,
                ...shuffle(possibleAnswers).slice(0, Constants.AUDIO_CHALLENGE_COUNT_ANSWERS - 1),
            ]).map((answer, index) => new Answer(index, answer, answer === correctTranslate));
            const answersDiv = document.querySelector('.audio__challenge__answers') as HTMLElement;
            answersDiv.innerHTML = '';
            this.answers.forEach((answer) => answersDiv.append(answer.node));
            (document.querySelector('.audio__challenge__button') as HTMLElement).innerHTML = I_DONT_KNOW;
            this.playCurrentWordMusic();
            this.gameState = GameState.Question;
        } else {
            this.endGame();
        }
    }
    renderWord() {
        const MAIN = document.querySelector('.main') as HTMLElement;
        MAIN.innerHTML = `
        <div class="audio__challenge__background">
            <div class="audio__challenge__container">
                <div class="audio__challenge__svg__container">
                    <div class="audio__challenge__svg">
                    ${getAudioSvg()} 
                    </div>
                    <p class="audio__challenge__svg__text">Нажмите для повтора воспроизведения</p>
                </div>
                <div class="audio__challenge__answers"></div>
                <div class="audio__challenge__button"></div>
            </div>
        </div>
        `;
        (MAIN.querySelector('.audio__challenge__svg') as HTMLElement).addEventListener('click', () =>
            this.playCurrentWordMusic()
        );
        (MAIN.querySelector('.audio__challenge__answers') as HTMLElement).addEventListener('click', (e: Event) => {
            if (this.gameState !== GameState.Question) return;
            const target: HTMLElement = (e.target as HTMLElement).closest('.audio__challenge__answer') as HTMLElement;
            const answer = this.answers.find((el) => el.node === target);
            answer && this.checkAnswer(answer);
        });
        (MAIN.querySelector('.audio__challenge__button') as HTMLElement).addEventListener('click', () =>
            this.handleGameButton()
        );
        this.addHotKeys();
    }
    addHotKeys() {
        (document.querySelector('body') as HTMLElement).addEventListener('keypress', (e: KeyboardEvent) => {
            if (e.code === 'Space' && this.gameState === GameState.Answer) {
                return this.handleGameButton();
            }
            if (this.gameState !== GameState.Question) return;
            const HOT_KEYS: Record<string, () => void> = {
                Numpad1: () => this.checkAnswer(this.answers[0]),
                Numpad2: () => this.checkAnswer(this.answers[1]),
                Numpad3: () => this.checkAnswer(this.answers[2]),
                Numpad4: () => this.checkAnswer(this.answers[3]),
                Numpad5: () => this.checkAnswer(this.answers[4]),
                Digit1: () => this.checkAnswer(this.answers[0]),
                Digit2: () => this.checkAnswer(this.answers[1]),
                Digit3: () => this.checkAnswer(this.answers[2]),
                Digit4: () => this.checkAnswer(this.answers[3]),
                Digit5: () => this.checkAnswer(this.answers[4]),
                Space: () => this.handleGameButton(),
            };
            HOT_KEYS[e.code]?.();
        });
    }
    handleGameButton() {
        return this.gameState === GameState.Question ? this.skipWord() : this.nextWord();
    }
    skipWord() {
        this.addWordStatistic(this.words[this.wordIndex], false);
        this.finishQuestion();
    }
    checkAnswer(answer: Answer): void {
        if (answer.text === this.words[this.wordIndex].wordTranslate) {
            answer.markAsCorrect();
            this.addWordStatistic(this.words[this.wordIndex], true);
        } else {
            answer.markAsIncorrect();
            this.addWordStatistic(this.words[this.wordIndex], false);
        }
        this.finishQuestion();
    }
    finishQuestion() {
        const correctAnswer = this.answers.find(
            (answer) => answer.text === this.words[this.wordIndex].wordTranslate
        ) as Answer;
        correctAnswer.markAsCorrect();
        (document.querySelector('.audio__challenge__button') as HTMLElement).innerHTML = '&#10230;';
        this.gameState = GameState.Answer;
    }
}

export default AudioChallengePage;
