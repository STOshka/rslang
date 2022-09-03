import API from '../../application/api';
import LocalStorage from '../../application/localStorage';
import { Constants } from '../../utils/constants';
import { createHTMLElement, inRange, shuffle } from '../../utils/helpers';
import { ROUTES, UserWord, WordDifficulty } from '../../utils/types';
import BasePage from '../basePage';
import { wordsPageHTML } from './templates-html';
import { WordCard } from './wordCard';
import './words-list.css';

class WordListPage extends BasePage {
    group = 0;
    page = 0;
    wordsList: WordCard[] = [];
    isGlobalDescription = true;
    isGlobalTranslate = true;
    audio: HTMLAudioElement | undefined;
    constructor(api: API) {
        super(api);
    }
    async init(query: URLSearchParams) {
        super.init(query);
        const countGroup = Constants.COUNT_GROUPS + (LocalStorage.instance.isAuth() ? 1 : 0);
        const _group: unknown = query.get('group') || localStorage.getItem('wordListGroup');
        this.group = inRange(Number(_group as string), countGroup, 1);
        const _page: unknown = query.get('page') || localStorage.getItem('wordListPage');
        this.page = inRange(Number(_page as string), Constants.PAGE_PER_GROUP, 1);
        console.log(query);
        const MAIN = document.querySelector('.main') as HTMLElement;
        MAIN.innerHTML = wordsPageHTML;
        (document.querySelector('.words-partitions-btns-container') as HTMLElement).innerHTML = '';
        new Array(countGroup).fill(null).map((el, i) => {
            const text = i < Constants.COUNT_GROUPS ? `Часть ${i + 1}` : `Сложные`;
            const div = createHTMLElement('div', 'words-partition-btn', text);
            div.style.backgroundColor = `${Constants.groupColor[i]}`;
            div.addEventListener('click', () => this.switchGroup(i));
            (document.querySelector('.words-partitions-btns-container') as HTMLElement).append(div);
        });
        this.addListeners();
        await this.generateWordList();
        this.render();
    }
    render() {
        const wordsContainer = document.querySelector('.words-container') as HTMLElement;
        wordsContainer.innerHTML = '';
        this.wordsList.map((word) => wordsContainer.append(word.node));
        document.documentElement.scrollTop = 0;
        this.getColorForGroup();
        this.setStatusPaginationBtns();
    }
    addListeners() {
        const wordContainer = document.querySelector('.words-container') as HTMLElement;
        const paginationPreviousBtn = document.querySelector('.pagination-page-previous') as HTMLElement;
        const paginationNextBtn = document.querySelector('.pagination-page-next') as HTMLElement;
        const submitPageNumber = document.querySelector('.submit-page-number') as HTMLElement;
        const inputPageNumber = document.querySelector('.input-page-number') as HTMLElement;
        const globalDesc = document.querySelector('.global-description') as HTMLElement;
        const globalTranslate = document.querySelector('.global-translate-on-btn') as HTMLElement;
        const sortBtn = document.querySelector('.sort-btn') as HTMLElement;
        const shuffleBtn = document.querySelector('.shuffle-btn') as HTMLElement;
        const resetBtn = document.querySelector('.reset-btn') as HTMLElement;
        const audiochallengeGame = document.querySelector('.game-audiochallenge') as HTMLElement;
        const sprintGame = document.querySelector('.game-sprint') as HTMLElement;
        wordContainer.addEventListener('click', (e) => this.wordContainerEvents(e));
        paginationPreviousBtn.addEventListener('click', () => this.previousPage());
        paginationNextBtn.addEventListener('click', () => this.nextPage());
        submitPageNumber.addEventListener('click', () => this.switchPage());
        inputPageNumber.addEventListener('keypress', (e) => this.pressEnterKey(e));
        globalDesc.addEventListener('click', () => this.switchGlobalDesc());
        globalTranslate.addEventListener('click', () => this.switchGlobalTranslate());
        sortBtn.addEventListener('click', () => this.sortWords(true));
        shuffleBtn.addEventListener('click', () => this.shuffleWords(true));
        resetBtn.addEventListener('click', () => this.resetSettings(true));
        audiochallengeGame.addEventListener('click', () => this.playGame(ROUTES.AUDIO_CHALLENGE_GAME));
        sprintGame.addEventListener('click', () => this.playGame(ROUTES.SPRINT_GAME));
    }
    playGame(game: string) {
        window.location.hash = `${game}?group=${this.group}&page=${this.page}`;
    }
    wordContainerEvents(e: MouseEvent) {
        const target: HTMLElement = (e.target as HTMLElement).closest('.word-container') as HTMLElement;
        const word = this.wordsList.find((el) => el.node === target);
        if (!word) return;
        const EVENTS: Record<string, (word: WordCard) => void> = {
            'word-btn word-sound-btn': (word) => this.playSound(word),
            'word-btn word-stop-sound-btn': () => this.stopSound(),
            'word-btn word-translate': (word) => this.changeWordTranslate(word),
            'word-btn word-description': (word) => this.changeWordDescription(word),
            'word-btn word-btn-learned': (word) => this.changeDifficult(word, WordDifficulty.learning),
            'word-btn word-btn-hard': (word) => this.changeDifficult(word, WordDifficulty.hard),
        };
        EVENTS[(e.target as HTMLElement).classList.toString()]?.(word);
    }
    playSound(word: WordCard) {
        this.stopSound();
        this.audio = new Audio(`${Constants.URL}${word.word.audio}`);
        this.audio.play();
        this.audio.onended = () => {
            this.audio = new Audio(`${Constants.URL}${word.word.audioMeaning}`);
            this.audio.play();
            this.audio.onended = () => {
                this.audio = new Audio(`${Constants.URL}${word.word.audioExample}`);
                this.audio.play();
            };
        };
    }
    stopSound() {
        this.audio?.pause();
    }
    changeWordTranslate(word: WordCard) {
        word.updateVisibleTranslate(!word.translateVisible);
    }
    changeWordDescription(word: WordCard) {
        word.updateVisibleDescription(!word.descriptionVisible);
    }
    async changeDifficult(word: WordCard, difficulty: WordDifficulty) {
        if (!LocalStorage.instance.isAuth()) {
            return;
        }
        const _word = word.word;
        const response = await this.api.getWordById(_word._id);
        if (response.status === 404) {
            await this.api.createWordById(_word._id, {
                difficulty: difficulty,
                optional: { found: 0, correct: 0, repeat: 0 },
            });
            word.generateDifficulty(difficulty);
        } else {
            const data = (await response.json()) as UserWord;
            console.log(data.difficulty);
            data.difficulty = data.difficulty === difficulty ? WordDifficulty.normal : difficulty;
            await this.api.updateWordById(_word._id, { difficulty: data.difficulty, optional: data.optional });
            word.generateDifficulty(data.difficulty);
            if (this.group === Constants.COUNT_GROUPS && data.difficulty !== WordDifficulty.hard) {
                (document.querySelector('.words-container') as HTMLElement).removeChild(word.node);
            }
        }
    }
    async switchGroup(group: number) {
        this.group = group;
        localStorage.setItem('wordListGroup', group.toString());
        await this.generateWordList();
        this.render();
    }
    async generateWordList() {
        const words = await (this.group < Constants.COUNT_GROUPS
            ? this.api.getWordList(this.group, this.page)
            : this.api.getAggregatedHardWords());
        this.wordsList = words.map((word) => new WordCard(word));
        this.switchGlobalDesc(this.isGlobalDescription);
        this.switchGlobalTranslate(this.isGlobalTranslate);
        localStorage.getItem('sortWords') === 'shuffle' ? this.shuffleWords() : this.sortWords();
    }
    async previousPage() {
        if (this.page > 0) {
            this.page = this.page - 1;
            localStorage.setItem('wordListPage', this.page.toString());
            await this.generateWordList();
            this.render();
        }
    }
    async nextPage() {
        if (this.page < Constants.PAGE_PER_GROUP) {
            this.page = this.page + 1;
            localStorage.setItem('wordListPage', this.page.toString());
            await this.generateWordList();
            this.render();
        }
    }
    async switchPage() {
        const inputPageNumber = document.querySelector('.input-page-number') as HTMLInputElement;
        const page = Number(inputPageNumber.value);
        if (page > 0 && page <= Constants.PAGE_PER_GROUP) {
            this.page = page - 1;
            localStorage.setItem('wordListPage', this.page.toString());
            await this.generateWordList();
            this.render();
        } else {
            inputPageNumber.value = (this.page + 1).toString();
        }
    }
    pressEnterKey(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.switchPage();
        }
    }
    setStatusPaginationBtns() {
        const wordsPagination = document.querySelector('.words-pagination') as HTMLElement;
        if (this.group === Constants.COUNT_GROUPS) {
            wordsPagination.classList.add('display-none');
            return;
        }
        wordsPagination.classList.remove('display-none');
        const paginationPreviousBtn = document.querySelector('.pagination-page-previous') as HTMLButtonElement;
        const paginationNextBtn = document.querySelector('.pagination-page-next') as HTMLElement;

        paginationPreviousBtn.classList.remove('inactive-btn');
        paginationNextBtn.classList.remove('inactive-btn');
        if (this.page <= 0) {
            paginationPreviousBtn.classList.add('inactive-btn');
        }
        if (this.page >= Constants.PAGE_PER_GROUP - 1) {
            paginationNextBtn.classList.add('inactive-btn');
        }
        (document.querySelector('.input-page-number') as HTMLInputElement).value = String(this.page + 1);
    }
    getColorForGroup() {
        const body = document.querySelector('body') as HTMLElement;
        const headerNav = document.querySelector('.header-nav') as HTMLElement;
        const wordsPageBtnsContainer = document.querySelector('.words-page-btns-container') as HTMLElement;
        const wordsPartitionBtn = document.querySelectorAll('.words-partition-btn') as NodeListOf<HTMLButtonElement>;
        const wordsPagination = document.querySelector('.words-pagination') as HTMLElement;

        body.style.backgroundColor = `${Constants.groupColor[this.group]}`;
        headerNav.style.backgroundColor = `${Constants.groupColor[this.group]}`;
        wordsPageBtnsContainer.style.backgroundColor = `${Constants.groupColor[this.group]}`;
        wordsPartitionBtn.forEach((el, i) => (el.style.backgroundColor = `${Constants.groupColor[i]}`));
        wordsPagination.style.backgroundColor = `${Constants.groupColor[this.group]}`;
    }
    switchGlobalDesc(visible = !this.isGlobalDescription) {
        this.isGlobalDescription = visible;
        this.wordsList.forEach((el) => el.updateVisibleDescription(this.isGlobalDescription));
        (document.querySelector('.global-description') as HTMLElement).innerHTML = this.isGlobalDescription
            ? 'ON'
            : 'OFF';
    }
    switchGlobalTranslate(visible = !this.isGlobalTranslate) {
        this.isGlobalTranslate = visible;
        this.wordsList.forEach((el) => el.updateVisibleTranslate(this.isGlobalTranslate));
        (document.querySelector('.global-translate-on-btn') as HTMLElement).innerHTML = this.isGlobalTranslate
            ? 'ON'
            : 'OFF';
    }
    sortWords(render = false) {
        this.wordsList = [...this.wordsList].sort((a, b) =>
            a.word.word.toLowerCase() > b.word.word.toLowerCase() ? 1 : -1
        );
        localStorage.setItem('sortWords', 'sortABC');
        render && this.render();
    }
    shuffleWords(render = false) {
        this.wordsList = shuffle(this.wordsList);
        localStorage.setItem('sortWords', 'shuffle');
        render && this.render();
    }
    resetSettings(render = false) {
        this.sortWords();
        this.switchGlobalDesc(true);
        this.switchGlobalTranslate(true);
        render && this.render();
    }
}

export default WordListPage;
