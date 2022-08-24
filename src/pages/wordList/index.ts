import API from '../../application/api';
import BasePage from '../basePage';
import { wordsPageHTML, pageData, api } from './constans';
import {
    getWordsData, constructWordBlocks, getGroup, getPage, setStatusPartitionBtns,
    setStatusPaginationBtns, switchToPageNumber,
} from './helpers';

class WordListPage extends BasePage {
    constructor(api: API) {
        super(api);
    }
    init(query: URLSearchParams) {
        super.init(query);
        const MAIN = document.querySelector('.main') as HTMLElement;
        MAIN.innerHTML = 'WORD LIST';
    }
}

export const switchPage = new WordListPage(api);

export default WordListPage;
