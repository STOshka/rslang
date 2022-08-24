import API from '../../application/api';
import BaseGamePage from '../baseGamePage';

class AudioChallengePage extends BaseGamePage {
    constructor(api: API) {
        super(api);
    }
    init(query: URLSearchParams) {
        super.init(query);
        const MAIN = document.querySelector('.main') as HTMLElement;
        MAIN.innerHTML = 'AUDIO CHALLENGE PAGE';
    }
}

export default AudioChallengePage;
