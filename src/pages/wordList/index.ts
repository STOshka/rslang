import API from '../../application/api';
import BasePage from '../basePage';
import { pageData, api } from './constans';
import { wordsPageHTML } from './templates-html';
import {
    getWordsData, constructWordBlocks, getGroup, getPage, setStatusPartitionBtns,
    setStatusPaginationBtns, switchToPageNumber, sortWordsDataABC, shuffleWordsData, 
    translateON, translateOFF, getPageLocalStorage
} from './helpers';

class WordListPage extends BasePage {
    constructor(api: API) {
        super(api);
    }
    init() {
        const BODY = document.querySelector('body') as HTMLElement;
        BODY.innerHTML = wordsPageHTML;

        const partitionBtns = document.querySelectorAll('.words-partition-btn') as NodeListOf<HTMLButtonElement>;
        const paginationBtns = document.querySelectorAll('.pagination-page-btn') as NodeListOf<HTMLButtonElement>;
        const submitPageNumber = document.querySelector('.submit-page-number') as HTMLInputElement;
        const inputPageNumber = document.querySelector('.input-page-number') as HTMLInputElement;
        const sortBtn = document.querySelector('.sort-btn') as HTMLButtonElement;
        const shuffleBtn = document.querySelector('.shuffle-btn') as HTMLButtonElement;
        const translateOnBtn = document.querySelector('.translate-on-btn') as HTMLButtonElement;
        const translateOffBtn = document.querySelector('.translate-off-btn') as HTMLButtonElement;

        partitionBtns.forEach((el: HTMLButtonElement) => el.addEventListener('click', getGroup));
        paginationBtns.forEach((el: HTMLButtonElement) => el.addEventListener('click', getPage));
        submitPageNumber.addEventListener('click', switchToPageNumber);
        sortBtn.addEventListener('click', sortWordsDataABC);
        shuffleBtn.addEventListener('click', shuffleWordsData);
        translateOnBtn.addEventListener('click', translateON);
        translateOffBtn.addEventListener('click', translateOFF);

        getPageLocalStorage();
        
        this.api.getWordList(pageData.group, pageData.page)
            .then((response) => { getWordsData(response); })
            .then(() => { constructWordBlocks(); })

        inputPageNumber.value = String((pageData.page + 1));

        setStatusPartitionBtns();
        setStatusPaginationBtns();
    }
}

export const switchPage = new WordListPage(api);

export default WordListPage;
