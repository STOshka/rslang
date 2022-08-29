export enum PAGES {
    HOME_PAGE = 'home',
    AUTH_PAGE = 'auth',
    WORD_LIST = 'word_list',
    AUDIO_CHALLENGE_GAME = 'audio_challenge',
    SPRINT_GAME = 'sprint',
    ERROR = 'error',
    ABOUT_THE_TEAM = 'about',
}

export enum ROUTES {
    HOME_PAGE = '',
    AUTH_PAGE = '#auth',
    WORD_LIST = '#wordlist',
    AUDIO_CHALLENGE_GAME = '#audio',
    SPRINT_GAME = '#sprint',
    ERROR = '#error',
    ABOUT_THE_TEAM = '#about',
}

export interface IWord {
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

export enum GameState {
    StartScreen,
    Question,
    Answer,
    GameOver,
}

export interface GameWordStatistic {
    word: IWord;
    isCorrect: boolean;
}
