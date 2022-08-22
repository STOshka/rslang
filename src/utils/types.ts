export enum PAGES {
    HOME_PAGE = 'home',
    WORD_LIST = 'word_list',
    AUDIO_CHALLENGE_GAME = 'audio_challenge',
    SPRINT_GAME = 'sprint',
    ERROR = 'error',
}

export enum ROUTES {
    HOME_PAGE = '',
    WORD_LIST = '#wordlist',
    AUDIO_CHALLENGE_GAME = '#audio',
    SPRINT_GAME = '#sprint',
    ERROR = '#error',
}

export interface IWordsInf {
    id: string;
    group: number;
    page: number;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    textExampleTranslate: string;
    textMeaningTranslate: string;
    wordTranslate: string;
}
