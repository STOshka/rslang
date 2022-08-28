import { Constants } from "../../utils/constants";
import { IWord } from "../../utils/types";
import { pageData, wordsData } from "./constans";
import { soundLogoSvg } from "./templates-html";
import { switchPage } from ".";

export function getWordsData(response: IWord[]) {
    wordsData.splice(0, wordsData.length);
    response.forEach((el: IWord) => wordsData.push(el));

    getSortLocalStorage();

    console.log(wordsData);
}

export function constructWordBlocks() {
    const wordsContainer = document.querySelector('.words-container') as HTMLElement;

    wordsContainer.innerHTML = '';

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
        <div class="word-btns-container">
            <div class="sound-btns-container">
                <button class="word-btn word-sound-btn" data-id="${i}">${soundLogoSvg}</button>
                <button class="word-btn word-stop-sound-btn" data-id="${i}">STOP</button>
            </div>
            <button class="word-btn word-btn-studied" data-id="${i}">Studied</button>
            <button class="word-btn word-btn-difficult" data-id="${i}">Difficult</button>
        </div>
    </div>     
    `);
    });
    const soundBtn = document.querySelectorAll('.word-sound-btn') as NodeListOf<HTMLButtonElement>;
    const stopSoundBtn = document.querySelectorAll('.word-stop-sound-btn') as NodeListOf<HTMLButtonElement>;
    const studiedBtn = document.querySelectorAll('.word-btn-studied') as NodeListOf<HTMLButtonElement>;
    const difficultBtn = document.querySelectorAll('.word-btn-difficult') as NodeListOf<HTMLButtonElement>;

    soundBtn.forEach((el: HTMLButtonElement) => el.addEventListener('click', playWordAudio));
    stopSoundBtn.forEach((el: HTMLButtonElement) => el.addEventListener('click', playWordAudio));
    studiedBtn.forEach((el: HTMLButtonElement) => el.addEventListener('click', markStudiedWord));
    difficultBtn.forEach((el: HTMLButtonElement) => el.addEventListener('click', markDifficultWord));

    getTranslateLocalStorage();
    setPageLocalStorage();
    document.documentElement.scrollTop = 0;
}

export function getGroup(event: MouseEvent) {
    if (!(event.target instanceof HTMLButtonElement)) { return; }

    const partiton = Number(event.target?.dataset.group);
    pageData.group = partiton;
    pageData.page = 0;

    setPageLocalStorage();
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

    setPageLocalStorage();
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

    setPageLocalStorage();
    switchPage.init();
}

export function sortWordsDataABC() {
    const sortBtn = document.querySelector('.sort-btn') as HTMLButtonElement;
    const shuffleBtn = document.querySelector('.shuffle-btn') as HTMLButtonElement;

    sortBtn.classList.add('active-btn');
    shuffleBtn.classList.remove('active-btn');

    wordsData.sort((a, b) => (a.word).toLowerCase() > (b.word).toLowerCase() ? 1 : -1);
    localStorage.setItem('sortWords', 'sortABC');

    constructWordBlocks();
}

export function shuffleWordsData() {
    const sortBtn = document.querySelector('.sort-btn') as HTMLButtonElement;
    const shuffleBtn = document.querySelector('.shuffle-btn') as HTMLButtonElement;

    shuffleBtn.classList.add('active-btn');
    sortBtn.classList.remove('active-btn');

    wordsData.sort(() => Math.random() - 0.5);
    localStorage.setItem('sortWords', 'shuffle');

    constructWordBlocks();
}

export function translateON() {
    const textTranslate = document.querySelectorAll('.translate-text-container') as NodeListOf<HTMLElement>;
    const translateOnBtn = document.querySelector('.translate-on-btn') as HTMLButtonElement;
    const translateOffBtn = document.querySelector('.translate-off-btn') as HTMLButtonElement;

    translateOnBtn.classList.add('active-btn');
    translateOffBtn.classList.remove('active-btn');

    localStorage.setItem('translate', 'on');
    textTranslate.forEach(el => el.classList.remove('translate-text-none'));
}

export function translateOFF() {
    const textTranslate = document.querySelectorAll('.translate-text-container') as NodeListOf<HTMLElement>;
    const translateOnBtn = document.querySelector('.translate-on-btn') as HTMLButtonElement;
    const translateOffBtn = document.querySelector('.translate-off-btn') as HTMLButtonElement;

    translateOffBtn.classList.add('active-btn');
    translateOnBtn.classList.remove('active-btn');

    localStorage.setItem('translate', 'off');
    textTranslate.forEach(el => el.classList.add('translate-text-none'));
}

function playWordAudio(event: MouseEvent) {
    if (!(event.target instanceof HTMLButtonElement)) { return; }

    const soundBtn = document.querySelectorAll('.word-sound-btn') as NodeListOf<HTMLButtonElement>;
    const soundIconId = Number(event.target?.dataset.id);
    const soundWord = new Audio(`${Constants.URL}${wordsData[soundIconId].audio}`) as HTMLAudioElement;
    const soundMeaning = new Audio(`${Constants.URL}${wordsData[soundIconId].audioMeaning}`) as HTMLAudioElement;
    const soundExample = new Audio(`${Constants.URL}${wordsData[soundIconId].audioExample}`) as HTMLAudioElement;
    const currentBtn = event.target;

    if (event.target.classList.contains('word-sound-btn')) {
        event.target.classList.add('no-click-btn', 'active-btn');

        soundWord.play();
        soundWord.onended = () => soundMeaning.play();
        soundMeaning.onended = () => soundExample.play();
        soundExample.onended = () => currentBtn.classList.remove('active-btn');
    }

    if (event.target.classList.contains('word-stop-sound-btn')) {
        soundBtn.forEach(el => el.classList.remove('no-click-btn', 'active-btn'));

        if (soundWord.played || soundMeaning.played || soundExample.played) {
            soundWord.pause();
            soundWord.currentTime = 0;
            soundMeaning.pause();
            soundMeaning.currentTime = 0;
            soundExample.pause();
            soundExample.currentTime = 0;
        }
    }
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

function setPageLocalStorage() {
    localStorage.setItem('group', String(pageData.group));
    localStorage.setItem('page', String(pageData.page));
}

export function getPageLocalStorage() {
    pageData.group = Number(localStorage.getItem('group'));
    pageData.page = Number(localStorage.getItem('page'));
}

export function getSortLocalStorage() {
    if (localStorage.getItem('sortWords') === 'shuffle') { shuffleWordsData(); }
    if (localStorage.getItem('sortWords') !== 'shuffle') { sortWordsDataABC(); }
}

export function getTranslateLocalStorage() {
    if (localStorage.getItem('translate') === 'on') { translateON(); }
    if (localStorage.getItem('translate') === 'off') { translateOFF(); }
}


