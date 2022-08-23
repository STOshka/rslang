import API from '../../application/api';
import { Constants } from '../../utils/constants';
import { getAudioSvg, randomInt, shuffle, inRange, createHTMLElement } from '../../utils/helpers';
import { IWordsInf, ROUTES } from '../../utils/types';
import BasePage from '../basePage';
import Answer from './answer';
import './index.css';

enum GameState {
    StartScreen,
    Question,
    Answer,
    GameOver,
}

interface WordStatictic {
    word: IWordsInf;
    status: WordStatus;
}

enum WordStatus {
    INCORRECT = 'incorrect',
    CORRECT = 'correct',
}

class AudioChallengePage extends BasePage {
    words: IWordsInf[] = [];
    answers: Answer[] = [];
    statictic: WordStatictic[] = [];
    state = GameState.StartScreen;
    group = -1;
    page = -1;
    wordIndex = -1;
    constructor(api: API) {
        super(api);
    }
    init(query: URLSearchParams) {
        this.page = inRange(
            parseInt(query.get('page') as string) as number,
            Constants.PAGE_PER_GROUP - 1,
            randomInt(Constants.PAGE_PER_GROUP)
        );
        this.group = inRange(parseInt(query.get('group') as string) as number, Constants.COUNT_GROUPS - 1, -1);
        if (this.group < 0) {
            this.chooseGroup();
        } else {
            this.generateWords();
        }
    }
    chooseGroup() {
        const BODY = document.querySelector('body') as HTMLElement;
        BODY.innerHTML = `<main class="audio__challenge__main">
            <div class="audio__challenge__name">АУДИОВЫЗОВ</div>
            <div class="audio__challenge__groups__list">
                <div>Выберите уровень сложности слов</div>
                <div class="audio__challenge__groups">
                </div>
            </div>
        </main>`;
        const GROUPS = BODY.querySelector('.audio__challenge__groups') as HTMLElement;
        new Array(Constants.COUNT_GROUPS).fill(null).forEach((el, ind) => {
            const group = createHTMLElement('div', 'audio__challenge__group', `${ind + 1}`);
            group.addEventListener('click', () => {
                window.location.hash = ROUTES.AUDIO_CHALLENGE_GAME + `?group=${ind}`;
            });
            GROUPS.append(group);
        });
    }
    async generateWords(): Promise<void> {
        const words = await this.api.getWordList(this.group, this.page);
        this.words = shuffle(words);
        this.statictic = [];
        this.renderWordGame();
        this.nextWord();
    }
    nextWord(): void {
        if (this.state !== GameState.Answer && this.state !== GameState.StartScreen) return;
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
            (document.querySelector('.audio__challenge__button') as HTMLElement).innerHTML = `I don't know`;
            this.playCurrentWordMusic();
            this.state = GameState.Question;
        } else {
            this.state = GameState.GameOver;
            console.log(this.statictic);
        }
    }
    renderWordGame() {
        const BODY = document.querySelector('body') as HTMLElement;
        BODY.innerHTML = `<main class="audio__challenge__main">
            <div class="audio__challenge__svg">${getAudioSvg()}</div>
            <div class="audio__challenge__answers"></div>
            <div class="audio__challenge__button"></div>
        </main>`;
        (BODY.querySelector('.audio__challenge__svg') as HTMLElement).addEventListener('click', () =>
            this.playCurrentWordMusic()
        );
        (BODY.querySelector('.audio__challenge__answers') as HTMLElement).addEventListener('click', (e: Event) => {
            if (this.state !== GameState.Question) return;
            const target: HTMLElement = (e.target as HTMLElement).closest('.audio__challenge__answer') as HTMLElement;
            const answer = this.answers.find((el) => el.node === target);
            answer && this.checkAnswer(answer);
        });
        (BODY.querySelector('.audio__challenge__button') as HTMLElement).addEventListener('click', () => {
            this.nextWord();
        });
    }
    checkAnswer(answer: Answer): void {
        const correctAnswer = this.answers.find(
            (answer) => answer.text === this.words[this.wordIndex].wordTranslate
        ) as Answer;
        if (answer === correctAnswer) {
            answer.markAsCorrect();
            this.addWordStatictic(WordStatus.CORRECT);
        } else {
            answer.markAsIncorrect();
            correctAnswer.markAsCorrect();
            this.addWordStatictic(WordStatus.INCORRECT);
        }
        (document.querySelector('.audio__challenge__button') as HTMLElement).innerHTML = '-->';
        this.state = GameState.Answer;
    }
    addWordStatictic(status: WordStatus) {
        const wordStat: WordStatictic = {
            word: this.words[this.wordIndex],
            status,
        };
        this.statictic = [...this.statictic, wordStat];
    }
    playCurrentWordMusic() {
        const audio = new Audio(`${Constants.URL}${this.words[this.wordIndex].audio}`);
        audio.play();
    }
}

export default AudioChallengePage;
