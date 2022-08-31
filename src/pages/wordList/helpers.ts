import { Constants } from "../../utils/constants";
import { IWord } from "../../utils/types";
import { pageData, wordsData } from "./constans";
import { soundLogoSvg } from "./templates-html";
import { switchPage } from ".";
import { colorsArray1, colorsArray2 } from "./data";

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
            <div class="word-description-container" id="word-description-container${i}">
                <p class="word-text word-meaning">${el.textMeaning}</p>
                <p class="word-text word-example">${el.textExample}</p>
            </div>
            <div class="translate-text-container" id="translate-text-container${i}">
                <h4 class="word-translate">${el.wordTranslate}</h4>
                <p class="word-text word-meaning-translate">${el.textMeaningTranslate}</p>
                <p class="word-text word-example-translate">${el.textExampleTranslate}</p>                                                
            </div>
        </div>
        <div class="word-btns-container">
            <p class="word-btns-title">Voice:</p>
            <div class="word-btns-subcontainer">
                <button class="word-btn word-sound-btn" data-id="${i}">${soundLogoSvg}</button>
                <button class="word-btn word-stop-sound-btn no-click-btn" id="stop-sound-btn${i}" data-id="${i}">STOP</button>
            </div>
            <p class="word-btns-title">Translate:</p>
            <div class="word-btns-subcontainer">
                <button class="word-btn word-translate-btn-on" data-id="${i}">ON</button>
                <button class="word-btn word-translate-btn-off" data-id="${i}">OFF</button>
            </div>
            <p class="word-btns-title">Description:</p>
            <div class="word-btns-subcontainer">
                <button class="word-btn word-description-on" data-id="${i}">ON</button>
                <button class="word-btn word-description-off" data-id="${i}">OFF</button>
            </div>
            <button class="word-btn word-btn-studied" data-id="${i}">Studied</button>
            <button class="word-btn word-btn-difficult" data-id="${i}">Difficult</button>
        </div>
    </div>     
    `);
    });
    const soundBtn = document.querySelectorAll('.word-sound-btn') as NodeListOf<HTMLButtonElement>;
    const stopSoundBtn = document.querySelectorAll('.word-stop-sound-btn') as NodeListOf<HTMLButtonElement>;
    const translateOnBtns = document.querySelectorAll('.word-translate-btn-on') as NodeListOf<HTMLButtonElement>;
    const translateOffBtns = document.querySelectorAll('.word-translate-btn-off') as NodeListOf<HTMLButtonElement>;
    const descriptionOnBtns = document.querySelectorAll('.word-description-on') as NodeListOf<HTMLButtonElement>;
    const descriptionOffBtns = document.querySelectorAll('.word-description-off') as NodeListOf<HTMLButtonElement>;
    const studiedBtn = document.querySelectorAll('.word-btn-studied') as NodeListOf<HTMLButtonElement>;
    const difficultBtn = document.querySelectorAll('.word-btn-difficult') as NodeListOf<HTMLButtonElement>;

    soundBtn.forEach((el: HTMLButtonElement) => el.addEventListener('click', playWordAudio));
    stopSoundBtn.forEach((el: HTMLButtonElement) => el.addEventListener('click', playWordAudio));
    translateOnBtns.forEach((el: HTMLButtonElement) => el.addEventListener('click', toggleWordTranslate));
    translateOffBtns.forEach((el: HTMLButtonElement) => el.addEventListener('click', toggleWordTranslate));
    descriptionOnBtns.forEach((el: HTMLButtonElement) => el.addEventListener('click', toggleDescription));
    descriptionOffBtns.forEach((el: HTMLButtonElement) => el.addEventListener('click', toggleDescription));
    studiedBtn.forEach((el: HTMLButtonElement) => el.addEventListener('click', markStudiedWord));
    difficultBtn.forEach((el: HTMLButtonElement) => el.addEventListener('click', markDifficultWord));

    getDescriptionLocalStorage();
    getTranslateLocalStorage();
    setPageLocalStorage();
    document.documentElement.scrollTop = 0;
}

export function getColorForGroup() {
    const body = document.querySelector('body') as HTMLElement;
    const headerNav = document.querySelector('.header-nav') as HTMLElement;
    const wordsPageBtnsContainer = document.querySelector('.words-page-btns-container') as HTMLElement;
    const wordsPartitionBtn = document.querySelectorAll('.words-partition-btn') as NodeListOf<HTMLButtonElement>;
    const wordsPagination = document.querySelector('.words-pagination') as HTMLElement;
    const wordsContainer = document.querySelector('.words-container') as HTMLElement;
    const wordsBorderTop = document.querySelector('.words-border-top') as HTMLElement;
    const wordsBorderRight = document.querySelector('.words-border-right') as HTMLElement;
    const wordsBorderBottom = document.querySelector('.words-border-bottom') as HTMLElement;
    const wordsBorderLeft = document.querySelector('.words-border-left') as HTMLElement;

    body.style.backgroundColor = `${colorsArray1[pageData.group]}`;
    headerNav.style.backgroundColor = `${colorsArray1[pageData.group]}`;
    wordsPageBtnsContainer.style.backgroundColor = `${colorsArray1[pageData.group]}`;
    wordsPartitionBtn.forEach((el, i) => el.style.backgroundColor = `${colorsArray1[i]}`)
    wordsPagination.style.backgroundColor = `${colorsArray1[pageData.group]}`;
    wordsContainer.style.backgroundColor = `${colorsArray2[pageData.group]}`;
    wordsBorderTop.style.backgroundColor = `${colorsArray2[pageData.group]}`;
    wordsBorderRight.style.backgroundColor = `${colorsArray2[pageData.group]}`;
    wordsBorderBottom.style.backgroundColor = `${colorsArray2[pageData.group]}`;
    wordsBorderLeft.style.backgroundColor = `${colorsArray2[pageData.group]}`;
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

export function pressEnterKey(event: KeyboardEvent)  {
    if (event.key === 'Enter') {
        event.preventDefault();
        switchToPageNumber();
    }
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

export function descriptionAllON() {
    const textDescription = document.querySelectorAll('.word-description-container') as NodeListOf<HTMLElement>;
    const descriptionOnBtn = document.querySelector('.global-description-on-btn') as HTMLButtonElement;
    const descriptionOffBtn = document.querySelector('.global-description-off-btn') as HTMLButtonElement;

    descriptionOnBtn.classList.add('active-btn');
    descriptionOffBtn.classList.remove('active-btn');
    textDescription.forEach(el => el.classList.remove('display-none'));

    localStorage.setItem('description', 'on');
}

export function descriptionAllOFF() {
    const textDescription = document.querySelectorAll('.word-description-container') as NodeListOf<HTMLElement>;
    const descriptionOnBtn = document.querySelector('.global-description-on-btn') as HTMLButtonElement;
    const descriptionOffBtn = document.querySelector('.global-description-off-btn') as HTMLButtonElement;

    descriptionOffBtn.classList.add('active-btn');
    descriptionOnBtn.classList.remove('active-btn');
    textDescription.forEach(el => el.classList.add('display-none'));

    localStorage.setItem('description', 'off');
}

export function translateAllON() {
    const textTranslate = document.querySelectorAll('.translate-text-container') as NodeListOf<HTMLElement>;
    const translateOnBtn = document.querySelector('.global-translate-on-btn') as HTMLButtonElement;
    const translateOffBtn = document.querySelector('.global-translate-off-btn') as HTMLButtonElement;

    translateOnBtn.classList.add('active-btn');
    translateOffBtn.classList.remove('active-btn');
    textTranslate.forEach(el => el.classList.remove('display-none'));

    localStorage.setItem('translate', 'on');
}

export function translateAllOFF() {
    const textTranslate = document.querySelectorAll('.translate-text-container') as NodeListOf<HTMLElement>;
    const translateOnBtn = document.querySelector('.global-translate-on-btn') as HTMLButtonElement;
    const translateOffBtn = document.querySelector('.global-translate-off-btn') as HTMLButtonElement;

    translateOffBtn.classList.add('active-btn');
    translateOnBtn.classList.remove('active-btn');
    textTranslate.forEach(el => el.classList.add('display-none'));
    
    localStorage.setItem('translate', 'off');
}

function toggleWordTranslate(event: MouseEvent) {
    if (!(event.target instanceof HTMLButtonElement)) { return; }

    const currentBtnId = (event.target?.dataset.id);
    const wordTranslate = document.getElementById(`translate-text-container${currentBtnId}`) as HTMLElement;

    if (event.target.classList.contains('word-translate-btn-on')) {
        wordTranslate.classList.remove('display-none');
    }
    if (event.target.classList.contains('word-translate-btn-off')) {
        wordTranslate.classList.add('display-none');
    }
}

function toggleDescription(event: MouseEvent) {
    if (!(event.target instanceof HTMLButtonElement)) { return; }

    const currentBtnId = (event.target?.dataset.id);
    const wordDescription = document.getElementById(`word-description-container${currentBtnId}`) as HTMLElement;

    if (event.target.classList.contains('word-description-on')) {
        wordDescription.classList.remove('display-none');
    }
    if (event.target.classList.contains('word-description-off')) {
        wordDescription.classList.add('display-none');
    }
}

function playWordAudio(event: MouseEvent) {
    if (!(event.target instanceof HTMLButtonElement)) { return; }

    const soundBtn = document.querySelectorAll('.word-sound-btn') as NodeListOf<HTMLButtonElement>;
    const currentBtnId = Number(event.target?.dataset.id);
    const soundWord = new Audio(`${Constants.URL}${wordsData[currentBtnId].audio}`) as HTMLAudioElement;
    const soundMeaning = new Audio(`${Constants.URL}${wordsData[currentBtnId].audioMeaning}`) as HTMLAudioElement;
    const soundExample = new Audio(`${Constants.URL}${wordsData[currentBtnId].audioExample}`) as HTMLAudioElement;
    const stopCurrentBtn = document.getElementById(`stop-sound-btn${String(currentBtnId)}`) as HTMLButtonElement;

    if (event.target.classList.contains('word-sound-btn')) {
        soundBtn.forEach(el => el.classList.add('no-click-btn'));
        event.target.classList.add('active-btn');
        stopCurrentBtn.classList.remove('no-click-btn');

        soundWord.play();
        soundWord.onended = () => soundMeaning.play();
        soundMeaning.onended = () => soundExample.play();
        soundExample.onended = () => {
            soundBtn.forEach(el => el.classList.remove('no-click-btn', 'active-btn'));
            stopCurrentBtn.classList.add('no-click-btn');
        }
    }

    if (event.target.classList.contains('word-stop-sound-btn')) {
        soundBtn.forEach(el => el.classList.remove('no-click-btn', 'active-btn'));

        // soundWord.pause();
        // soundWord.currentTime = 0;
        // soundMeaning.pause();
        // soundMeaning.currentTime = 0;
        // soundExample.pause();
        // soundExample.currentTime = 0;

        console.log('stop');
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

export function resetSettings() {
    sortWordsDataABC();
    descriptionAllON();
    translateAllON();
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

export function getDescriptionLocalStorage() {
    if (localStorage.getItem('description') === 'on') { descriptionAllON(); }
    if (localStorage.getItem('description') === 'off') { descriptionAllOFF(); }
}

export function getTranslateLocalStorage() {
    if (localStorage.getItem('translate') === 'on') { translateAllON(); }
    if (localStorage.getItem('translate') === 'off') { translateAllOFF(); }
}


