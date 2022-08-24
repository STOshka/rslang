import { Constants } from "../../utils/constants";
import { pageData, wordsData, wordBtnsHTML } from "./constans";
import { switchPage } from ".";
import { IWordsData } from "./types";

export function getWordsData(response: any) {
    wordsData.splice(0, wordsData.length);
    response.forEach((el: IWordsData) => wordsData.push(el));
    console.log(wordsData);
    return wordsData;
}

export function constructWordBlocks() {
    const wordsContainer = document.querySelector('.words-container') as HTMLElement;

    wordsContainer.innerHTML = '';

    wordsData.forEach((el: IWordsData, i) => {
        wordsContainer.insertAdjacentHTML('beforeend', `
    <div class="word-container" id="block${i}" data-block="${i}">
        <div class="word-img-container">
            <img src="${Constants.URL}${el.image}" class="word-img">
        </div>
        <div class="word-text-container"> 
            <h4 class="word">${el.word}</h4>
            <p class="word-text word-meaning">${el.textMeaning}</p>
            <p class="word-text word-example">${el.textExample}</p>
            <h4 class="word-translate">${el.wordTranslate}</h4>
            <p class="word-text word-meaning-translate">${el.textMeaningTranslate}</p>
            <p class="word-text word-example-translate">${el.textExampleTranslate}</p>                                                
        </div>
        ${wordBtnsHTML}
    </div>     
    `);
    });
}

export function getGroup(event: MouseEvent) {
    if (!(event.target instanceof HTMLButtonElement)) { return; }

    const partiton = Number(event.target?.dataset.group);
    pageData.group = partiton;
    pageData.page = 0;

    switchPage.init();
    setStatusPartitionBtns();
    console.log(pageData);
}

export function getPage(event: MouseEvent) {
    if (!(event.target instanceof HTMLButtonElement)) { return; }

    const pagination = (event.target?.dataset.page);

    if (pagination === 'previos') {
        setStatusPaginationBtns();
        pageData.page = (pageData.page - 1);
    }
    if (pagination === 'next') {
        setStatusPaginationBtns();
        pageData.page = (pageData.page + 1);
    }

    switchPage.init();
}

export function setStatusPartitionBtns() {
    console.log(pageData);
    const partitionBtnId = document.getElementById(`group${pageData.group}`) as HTMLButtonElement;
    const partitionBtns = document.querySelectorAll('.words-partition-btn') as NodeListOf<HTMLButtonElement>;

    partitionBtns.forEach((el: HTMLButtonElement) => el.classList.remove('active-btn'));
    partitionBtnId.classList.add('active-btn');
}

export function setStatusPaginationBtns() {
    const pagesQty = 29;
    const paginationPreviosBtn = document.querySelector('.pagination-page-previos') as HTMLButtonElement;
    const paginationNextBtn = document.querySelector('.pagination-page-next') as HTMLElement;

    if (pageData.page <= 0) { paginationPreviosBtn.classList.add('inactive-btn'); }
    if (pageData.page > 0) { paginationPreviosBtn.classList.remove('inactive-btn'); }
    if (pageData.page >= pagesQty) { paginationNextBtn.classList.add('inactive-btn'); }
    if (pageData.page < pagesQty) { paginationNextBtn.classList.remove('inactive-btn'); }
}

export function switchToPageNumber() {
    const inputPageNumber = document.querySelector('.input-page-number') as HTMLInputElement;

    pageData.page = Number(inputPageNumber.value) - 1;

    switchPage.init();
}



 



