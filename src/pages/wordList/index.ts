import API from '../../application/api';
import { Constants } from '../../utils/constants';
import { createHTMLElement, inRange, shuffle } from '../../utils/helpers';
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
    constructor(api: API) {
        super(api);
    }
    async init(query: URLSearchParams) {
        super.init(query);
        const _group: unknown = query.get('group') || localStorage.getItem('wordListPage');
        this.group = inRange(Number(_group as string), Constants.PAGE_PER_GROUP - 1, 1);
        const _page: unknown = query.get('page') || localStorage.getItem('wordListPage');
        this.page = inRange(Number(_page as string), Constants.PAGE_PER_GROUP, 1);
        console.log(query);
        const MAIN = document.querySelector('.main') as HTMLElement;
        MAIN.innerHTML = wordsPageHTML;
        (document.querySelector('.words-partitions-btns-container') as HTMLElement).innerHTML = '';
        new Array(6).fill(null).map((el, i) => {
            const div = createHTMLElement('div', 'words-partition-btn', `Часть ${i + 1}`);
            div.style.backgroundColor = `${Constants.groupColor[i]}`;
            div.addEventListener('click', () => this.switchGroup(i));
            (document.querySelector('.words-partitions-btns-container') as HTMLElement).append(div);
        });
        this.addListeners();
        await this.generateWordList();
        this.render();
        /*getPageLocalStorage();*/
    }
    render() {
        const wordsContainer = document.querySelector('.words-container') as HTMLElement;
        wordsContainer.innerHTML = '';
        this.wordsList.map((word) => wordsContainer.append(word.node));
        (document.querySelector('.input-page-number') as HTMLInputElement).value = String(this.page + 1);
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
    }
    wordContainerEvents(e: MouseEvent) {
        const target: HTMLElement = (e.target as HTMLElement).closest('.word-container') as HTMLElement;
        const word = this.wordsList.find((el) => el.node === target);
        if (!word) return;
        const EVENTS: Record<string, (word: WordCard) => void> = {
            'word-btn word-sound-btn': (word) => this.empty(word),
            'word-btn word-stop-sound-btn': (word) => this.empty(word),
            'word-btn word-translate': (word) => this.changeWordTranslate(word),
            'word-btn word-description': (word) => this.changeWordDescription(word),
            'word-btn word-btn-learned': (word) => this.empty(word),
            'word-btn word-btn-hard': (word) => this.empty(word),
        };
        EVENTS[(e.target as HTMLElement).classList.toString()]?.(word);
    }
    empty(word: WordCard) {
        console.log(word);
    }
    changeWordTranslate(word: WordCard) {
        word.updateVisibleTranslate(!word.translateVisible);
    }
    changeWordDescription(word: WordCard) {
        word.updateVisibleDescription(!word.descriptionVisible);
    }
    switchGroup(group: number) {
        this.group = group;
        this.render();
    }
    async generateWordList() {
        const words = await this.api.getWordList(this.group, this.page);
        this.wordsList = words.map((word) => new WordCard(word));
        this.switchGlobalDesc(this.isGlobalDescription);
        this.switchGlobalTranslate(this.isGlobalTranslate);
        localStorage.getItem('sortWords') === 'shuffle' ? this.shuffleWords() : this.sortWords();
    }
    async previousPage() {
        if (this.page > 0) {
            this.page = this.page - 1;
            await this.generateWordList();
            this.render();
        }
    }
    async nextPage() {
        if (this.page < Constants.PAGE_PER_GROUP) {
            this.page = this.page + 1;
            await this.generateWordList();
            this.render();
        }
    }
    async switchPage() {
        const inputPageNumber = document.querySelector('.input-page-number') as HTMLInputElement;
        const page = Number(inputPageNumber.value);
        if (page > 0 && page <= Constants.PAGE_PER_GROUP) {
            this.page = page - 1;
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
