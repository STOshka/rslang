import API from '../../application/api';
import BasePage from '../basePage';
import { pageData, api } from './constans';
import { wordsPageHTML } from './templates-html';
import {
    getWordsData, constructWordBlocks, getGroup, getPage, setStatusPartitionBtns,
    setStatusPaginationBtns, pressEnterKey, switchToPageNumber, sortWordsDataABC, 
    shuffleWordsData, descriptionAllON, descriptionAllOFF, translateAllON, translateAllOFF, 
    resetSettings, getPageLocalStorage
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
        const descriptionOnBtn = document.querySelector('.global-description-on-btn') as HTMLButtonElement;
        const descriptionOffBtn = document.querySelector('.global-description-off-btn') as HTMLButtonElement;
        const translateOnBtn = document.querySelector('.global-translate-on-btn') as HTMLButtonElement;
        const translateOffBtn = document.querySelector('.global-translate-off-btn') as HTMLButtonElement;
        const resetBtn = document.querySelector('.reset-btn') as HTMLButtonElement;

        partitionBtns.forEach((el: HTMLButtonElement) => el.addEventListener('click', getGroup));
        paginationBtns.forEach((el: HTMLButtonElement) => el.addEventListener('click', getPage));
        inputPageNumber.addEventListener('keypress', pressEnterKey);
        submitPageNumber.addEventListener('click', switchToPageNumber);
        sortBtn.addEventListener('click', sortWordsDataABC);
        shuffleBtn.addEventListener('click', shuffleWordsData);
        descriptionOnBtn.addEventListener('click', descriptionAllON);
        descriptionOffBtn.addEventListener('click', descriptionAllOFF);
        translateOnBtn.addEventListener('click', translateAllON);
        translateOffBtn.addEventListener('click', translateAllOFF);
        resetBtn.addEventListener('click', resetSettings);

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
