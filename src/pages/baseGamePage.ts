import API from '../application/api';
import Authorization from '../application/auth';
import { Constants } from '../utils/constants';
import { createHTMLElement, getAudioSvg, inRange, randomInt, shuffle } from '../utils/helpers';
import {
    GameState,
    IWord,
    GameWordStatistic,
    ROUTES,
    WordDifficulty,
    FullGameStats,
    GameStats,
    UserWord,
} from '../utils/types';
import BasePage from './basePage';
import './statistics.css';

class BaseGamePage extends BasePage {
    game_name = '';
    words: IWord[] = [];
    wordIndex = -1;
    statistic: GameWordStatistic[] = [];
    gameState = GameState.StartScreen;
    group = -1;
    page = -1;
    correctStreak = 0;
    longestStreak = 0;
    score = 0;

    newWords = 0;
    learningWords = 0;
    constructor(api: API) {
        super(api);
    }
    init(query: URLSearchParams) {
        super.init(query);
        this.page = inRange(
            parseInt(query.get('page') as string) as number,
            Constants.PAGE_PER_GROUP - 1,
            randomInt(Constants.PAGE_PER_GROUP)
        );
        this.group = inRange(parseInt(query.get('group') as string) as number, Constants.COUNT_GROUPS - 1, -1);
        if (this.group < 0) {
            this.chooseLevel();
        } else {
            this.generateGame();
        }
    }
    chooseLevel() {
        const MAIN = document.querySelector('.main') as HTMLElement;
        MAIN.innerHTML = `<main class="game__main">
            <div class="game__name">${this.gameName()}</div>
            <div class="game__groups__list">
                <div>Выберите уровень сложности слов</div>
                <div class="game__groups"></div>
            </div>
        </main>`;
        const GROUPS = MAIN.querySelector('.game__groups') as HTMLElement;
        new Array(Constants.COUNT_GROUPS).fill(null).forEach((el, ind) => {
            const group = createHTMLElement('div', 'game__group', `${ind + 1}`);
            group.addEventListener('click', () => {
                window.location.hash = window.location.hash + `?group=${ind}`;
            });
            GROUPS.append(group);
        });
    }
    gameName() {
        return `NO NAME`;
    }
    async generateGame() {
        const words = await this.api.getWordList(this.group, this.page);
        this.words = shuffle(words);
        this.statistic = [];
        this.gameState = GameState.StartScreen;
        this.wordIndex = -1;
        this.correctStreak = 0;
        this.longestStreak = 0;
        this.score = 0;
        this.newWords = 0;
        this.learningWords = 0;
    }
    addWordStatistic(word: IWord, isCorrect: boolean, potPoints = 10) {
        if (Authorization.instance.isAuth()) {
            this.addWordforUser(word, isCorrect);
        }
        if (isCorrect) {
            this.score += potPoints;
        }
        this.statistic = [...this.statistic, { word, isCorrect }];
        this.correctStreak = isCorrect ? this.correctStreak + 1 : 0;
        if (this.correctStreak > this.longestStreak) {
            this.longestStreak = this.correctStreak;
        }
    }
    addWordforUser(word: IWord, isCorrect: boolean) {
        const firstFound = !Boolean(word.userWord);
        if (firstFound) {
            this.newWords += 1;
            word.userWord = {
                difficulty: WordDifficulty.normal,
                optional: { found: 1, correct: Number(isCorrect), repeat: Number(isCorrect) },
            };
            this.api.createWordById(word._id, word.userWord);
            return;
        }
        word.userWord = {
            difficulty: this.checkUserWord(word.userWord),
            optional: {
                found: word.userWord.optional.found + 1,
                correct: isCorrect ? word.userWord.optional.correct + 1 : word.userWord.optional.correct,
                repeat: isCorrect ? word.userWord.optional.repeat + 1 : 0,
            },
        };
        this.api.updateWordById(word._id, word.userWord);
    }
    checkUserWord(data: UserWord): WordDifficulty {
        const needRepeat = {
            [WordDifficulty.normal]: 3,
            [WordDifficulty.learning]: -1,
            [WordDifficulty.hard]: 5,
        };
        if (!Boolean(data.optional.repeat) && data.difficulty === WordDifficulty.learning) {
            return WordDifficulty.normal;
        }
        if (data.optional.repeat === needRepeat[data.difficulty]) {
            this.learningWords += 1;
            return WordDifficulty.learning;
        }
        return data.difficulty;
    }
    playCurrentWordMusic() {
        const audio = new Audio(`${Constants.URL}${this.words[this.wordIndex].audio}`);
        audio.play();
    }
    endGame() {
        this.gameState = GameState.GameOver;
        const MAIN = document.querySelector('.main') as HTMLElement;
        MAIN.innerHTML = `
        <div class="root__statistics">
            <div class="root__statistics__label">Набрано баллов: ${this.score}</div>
            <div class="root__statistics__label">Длинная серия правильных ответов: ${this.longestStreak}</div>
            <div class="root__statistics__correct">${this.generateSpanWords(true)}</div>
            <div class="root__statistics__incorrect">${this.generateSpanWords(false)}</div>
            <button class="root__statistics__return">Вернуться к учебнику</button>
        </div>`;
        (MAIN.querySelector('.root__statistics__return') as HTMLElement).addEventListener('click', () => {
            window.location.hash = ROUTES.WORD_LIST + `?group=${this.group}`;
        });
        this.generateStatistic();
        this.updateStatistic();
    }
    generateSpanWords(isCorrect: boolean): string {
        return `<div class="root__statistics__span">
            <span class="root__statistics__label">Ответили ${isCorrect ? '' : 'не'}правильно:</span>
            <span class="root__statistics__count">${
                this.statistic.filter((el) => el.isCorrect === isCorrect).length
            }</span>
            </div>
        <div class="root__statistics__${isCorrect ? '' : 'in'}correct__words"></div>`;
    }
    generateStatistic() {
        const CORRECT_WORDS = document.querySelector('.root__statistics__correct__words') as HTMLElement;
        const INCORRECT_WORDS = document.querySelector('.root__statistics__incorrect__words') as HTMLElement;
        this.statistic.forEach((el) => {
            const div = createHTMLElement('div', 'root__statistics__word');
            const audio = createHTMLElement('div', 'audio', getAudioSvg());
            div.append(audio);
            div.append(`${el.word.word} - ${el.word.wordTranslate}`);
            if (el.isCorrect) {
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
    async updateStatistic() {
        if (!Authorization.instance.isAuth() || this.game_name === '') {
            return null;
        }
        const response = await this.api.getStatistic();
        const data: FullGameStats =
            response.status === 404
                ? {
                      optional: {
                          games: {
                              audiochallenge: {},
                              sprint: {},
                              common: {},
                          },
                      },
                  }
                : await response.json();
        const date = new Date().toLocaleDateString();
        if (!data.optional.games[this.game_name]) {
            data.optional.games[this.game_name] = {};
        }
        data.optional.games[this.game_name][date] = this.updateUserStatistic(data.optional.games[this.game_name][date]);
        data.optional.games['common'][date] = this.updateUserStatistic(data.optional.games['common'][date]);
        await this.api.updateStatistic({ optional: data.optional });
    }
    updateUserStatistic(data: GameStats): GameStats {
        if (!data) {
            return {
                newWords: this.newWords,
                learningWords: this.learningWords,
                correct: this.statistic.filter((el) => el.isCorrect).length,
                answers: this.statistic.length,
                streak: this.longestStreak,
            };
        }
        return {
            newWords: data.newWords + this.newWords,
            learningWords: data.newWords + this.learningWords,
            correct: data.newWords + this.statistic.filter((el) => el.isCorrect).length,
            answers: data.newWords + this.statistic.length,
            streak: data.streak > this.longestStreak ? data.streak : this.longestStreak,
        };
    }
    changeFooter() {
        (document.querySelector('.footer') as HTMLElement).classList.add('display-none');
    }
}

export default BaseGamePage;
