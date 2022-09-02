import API from '../../application/api';
import { Constants } from '../../utils/constants';
import BasePage from '../basePage';
import { wordsPageHTML } from './templates-html';
import { WordCard } from './wordCard';
import './words-list.css';

class WordListPage extends BasePage {
    group = 0;
    page = 0;
    wordsList: WordCard[] = [];
    constructor(api: API) {
        super(api);
    }
    init(query: URLSearchParams) {
        super.init(query);
        const MAIN = document.querySelector('.main') as HTMLElement;
        MAIN.innerHTML = wordsPageHTML;
        this.addListeners();
        this.render();
        /*getPageLocalStorage();*/
    }
    async render() {
        const words = await this.api.getWordList(this.group, this.page);
        this.wordsList = words.map((word) => new WordCard(word));
        const wordsContainer = document.querySelector('.words-container') as HTMLElement;
        wordsContainer.innerHTML = '';
        this.wordsList.map((word) => wordsContainer.append(word.node));
        (document.querySelector('.input-page-number') as HTMLInputElement).value = String(this.page + 1);
        document.documentElement.scrollTop = 0;
        this.getColorForGroup();
        this.setStatusPaginationBtns();
    }
    addListeners() {
        (document.querySelector('.words-container') as HTMLElement).addEventListener('click', (e) =>
            this.wordContainerEvents(e)
        );
        (document.querySelector('.pagination-page-previous') as HTMLElement).addEventListener('click', () =>
            this.previousPage()
        );
        (document.querySelector('.pagination-page-next') as HTMLElement).addEventListener('click', () =>
            this.nextPage()
        );
        (document.querySelector('.submit-page-number') as HTMLElement).addEventListener('click', () =>
            this.switchPage()
        );
        (document.querySelector('.input-page-number') as HTMLElement).addEventListener('keypress', (e) =>
            this.pressEnterKey(e)
        );
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
    previousPage() {
        if (this.page > 0) {
            this.page = this.page - 1;
            this.render();
        }
    }
    nextPage() {
        if (this.page < Constants.PAGE_PER_GROUP) {
            this.page = this.page + 1;
            this.render();
        }
    }
    async switchPage() {
        const inputPageNumber = document.querySelector('.input-page-number') as HTMLInputElement;
        const page = Number(inputPageNumber.value);
        if (page > 0 && page <= Constants.PAGE_PER_GROUP) {
            this.page = page - 1;
            await this.render();
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
        const wordsContainer = document.querySelector('.words-container') as HTMLElement;

        body.style.backgroundColor = `${Constants.groupColors1[this.group]}`;
        headerNav.style.backgroundColor = `${Constants.groupColors1[this.group]}`;
        wordsPageBtnsContainer.style.backgroundColor = `${Constants.groupColors1[this.group]}`;
        wordsPartitionBtn.forEach((el, i) => (el.style.backgroundColor = `${Constants.groupColors1[i]}`));
        wordsPagination.style.backgroundColor = `${Constants.groupColors1[this.group]}`;
        wordsContainer.style.backgroundColor = `${Constants.groupColors2[this.group]}`;
    }
}

export default WordListPage;
