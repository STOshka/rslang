import API from '../../application/api';
import BasePage from '../basePage';

class AudioChallengePage extends BasePage {
    constructor(api: API) {
        super(api);
    }
    init() {
        const BODY = document.querySelector('body') as HTMLElement;
        BODY.innerHTML = 'AUDIO CHALLENGE';
    }
}

export default AudioChallengePage;
