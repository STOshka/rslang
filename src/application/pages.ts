import MainPage from '../pages/home';
import AuthPage from '../pages/auth';
import WordListPage from '../pages/wordList';
import AudioChallengePage from '../pages/audioChallenge';
// import SprintPage from '../pages/sprint';
import ErrorPage from '../pages/error';
import { PAGES, ROUTES } from '../utils/types';
import AboutTheTeam from '../pages/aboutTheTeam';

export const pages = [
    {
        name: PAGES.HOME_PAGE,
        route: ROUTES.HOME_PAGE,
        page: MainPage,
    },
    {
        name: PAGES.AUTH_PAGE,
        route: ROUTES.AUTH_PAGE,
        page: AuthPage,
    },
    {
        name: PAGES.WORD_LIST,
        route: ROUTES.WORD_LIST,
        page: WordListPage,
    },
    {
        name: PAGES.AUDIO_CHALLENGE_GAME,
        route: ROUTES.AUDIO_CHALLENGE_GAME,
        page: AudioChallengePage,
    },
    // {
    //     name: PAGES.SPRINT_GAME,
    //     route: ROUTES.SPRINT_GAME,
    //     // page: SprintPage,
    // },
    {
        name: PAGES.ERROR,
        route: ROUTES.ERROR,
        page: ErrorPage,
    },
    {
        name: PAGES.ABOUT_THE_TEAM,
        route: ROUTES.ABOUT_THE_TEAM,
        page: AboutTheTeam,
    }
];
