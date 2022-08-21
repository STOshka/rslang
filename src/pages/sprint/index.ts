import API from '../../application/api';
import BasePage from '../basePage';

class SprintPage extends BasePage {
    constructor(api: API) {
        super(api);
    }
    init() {
        const BODY = document.querySelector('body') as HTMLElement;
        BODY.innerHTML = `
                    <div class="sprint__game">
                        <div class="sprint__game_header sprint__header">
                            <div class="sprint__header_time"></div>
                            <div class="sprint__header_score"></div>
                        </div>
                        <div class="sprint__options_points sprint__points"></div>
                        <div class="sprint__game_main sprint__main">
                            <div class="sprint__main_words sprint__words">
                                <div class="sprint__words_word" id="word"></div>
                                <div class="sprint__words_word" id="translate"></div>
                            </div>
                            <div class="sprint__main_buttons sprint__buttons">
                                <button type="button" class="sprint__button" id="sprint-yes">Yes</button>
                                <button type="button" class="sprint__button" id="sprint-no">No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        `;
    }
}

export default SprintPage;
