import { Constants } from "../../utils/constants";
import { IWord } from "../../utils/types";
import { pageData, wordsData } from "./constans";
import { soundLogoSvg } from "./templates-html";
import { switchPage } from ".";

export function getWordsData(response: IWord[]) {
    wordsData.splice(0, wordsData.length);
    response.forEach((el: IWord) => wordsData.push(el));

    sortWordsDataABC();

    console.log(wordsData);
}

export function constructWordBlocks() {
    const wordsContainer = document.querySelector('.words-container') as HTMLElement;

    wordsContainer.innerHTML = '';
    document.documentElement.scrollTop = 0;

    wordsData.forEach((el: IWord, i) => {
        wordsContainer.insertAdjacentHTML('beforeend', `
    <div class="word-container" id="block${i}" data-block="${i}">
        <div class="word-img-container">
            <img src="${Constants.URL}${el.image}" class="word-img">
        </div>
        <div class="word-text-container"> 
            <h4 class="word">${el.word}</h4>
            <p class="word-text word-meaning">${el.textMeaning}</p>
            <p class="word-text word-example">${el.textExample}</p>
            <div class="translate-text-container">
                <h4 class="word-translate">${el.wordTranslate}</h4>
                <p class="word-text word-meaning-translate">${el.textMeaningTranslate}</p>
                <p class="word-text word-example-translate">${el.textExampleTranslate}</p>                                                
            </div>
        </div>
        <div class="word-audio-container"> 
            <audio class="word-audio" src="${Constants.URL}${el.audio}"></audio>
            <audio class="word-audio-meaning" src="${Constants.URL}${el.audioMeaning}"></audio>
            <audio class="word-audio-example" src="${Constants.URL}${el.audioExample}"></audio>                                               
        </div>
        <div class="word-btns">
            <button class="word-btn word-sound-btn" data-id="${i}">
                ${soundLogoSvg}
            </button>
            <button class="word-btn word-btn-studied" data-id="${i}">Stud</button>
            <button class="word-btn word-btn-difficult" data-id="${i}">Diff</button>
        </div>
    </div>     
    `);
    });
    const soundIcon = document.querySelectorAll('.word-sound-btn') as NodeListOf<HTMLButtonElement>;
    const studiedBtn = document.querySelectorAll('.word-btn-studied') as NodeListOf<HTMLButtonElement>;
    const difficultBtn = document.querySelectorAll('.word-btn-difficult') as NodeListOf<HTMLButtonElement>;

    soundIcon.forEach((el: HTMLButtonElement) => el.addEventListener('click', playWordAudio));
    studiedBtn.forEach((el: HTMLButtonElement) => el.addEventListener('click', markStudiedWord));
    difficultBtn.forEach((el: HTMLButtonElement) => el.addEventListener('click', markDifficultWord));
}

export function getGroup(event: MouseEvent) {
    if (!(event.target instanceof HTMLButtonElement)) { return; }

    const partiton = Number(event.target?.dataset.group);
    pageData.group = partiton;
    pageData.page = 0;

    switchPage.init();
    setStatusPartitionBtns();
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
    const paginationPreviosBtn = document.querySelector('.pagination-page-previos') as HTMLButtonElement;
    const paginationNextBtn = document.querySelector('.pagination-page-next') as HTMLElement;

    if (pageData.page <= 0) { paginationPreviosBtn.classList.add('inactive-btn'); }
    if (pageData.page > 0) { paginationPreviosBtn.classList.remove('inactive-btn'); }
    if (pageData.page >= Constants.PAGE_PER_GROUP - 1) { paginationNextBtn.classList.add('inactive-btn'); }
    if (pageData.page < Constants.PAGE_PER_GROUP - 1) { paginationNextBtn.classList.remove('inactive-btn'); }
}

export function switchToPageNumber() {
    const inputPageNumber = document.querySelector('.input-page-number') as HTMLInputElement;

    pageData.page = Number(inputPageNumber.value) - 1;

    switchPage.init();
}

export function sortWordsDataABC() {
    wordsData.sort((a, b) => (a.word).toLowerCase() > (b.word).toLowerCase() ? 1 : -1);
    constructWordBlocks();
}

export function shuffleWordsData() {
    wordsData.sort(() => Math.random() - 0.5);
    constructWordBlocks();
}

export function translateON() {
    const textTranslate = document.querySelectorAll('.translate-text-container') as NodeListOf<HTMLElement>;

    textTranslate.forEach(el => el.classList.remove('translate-text-none'));
}

export function translateOFF() {
    const textTranslate = document.querySelectorAll('.translate-text-container') as NodeListOf<HTMLElement>;

    textTranslate.forEach(el => el.classList.add('translate-text-none'));
}

function playWordAudio(event: MouseEvent) {

    if (!(event.target instanceof HTMLButtonElement)) { return; }

    const soundIconId = Number(event.target?.dataset.id);
    const soundWord = new Audio(`${Constants.URL}${wordsData[soundIconId].audio}`);
    const soundMeaning = new Audio(`${Constants.URL}${wordsData[soundIconId].audioMeaning}`);
    const soundExample = new Audio(`${Constants.URL}${wordsData[soundIconId].audioExample}`);

    soundWord.play();
    soundWord.onended = () => soundMeaning.play();
    soundMeaning.onended = () => soundExample.play();
}

function markStudiedWord(event: MouseEvent) {
    if (!(event.target instanceof HTMLButtonElement)) { return; }

    const studiedBtnId = Number(event.target?.dataset.id);

    console.log(`Studied word: ${wordsData[studiedBtnId].word}`);
}

function markDifficultWord(event: MouseEvent) {
    if (!(event.target instanceof HTMLButtonElement)) { return; }

    const difficultBtnId = Number(event.target?.dataset.id);

    console.log(`Difficult word: ${wordsData[difficultBtnId].word}`);
}

