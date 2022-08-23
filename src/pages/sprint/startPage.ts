import API from '../../application/api';

export default class StartPage {
    template: string;
    result: string;
    api: API;
    group: number;
    value: number;
    page: number;

    constructor() {
        this.template = `
      <div class="sprint__container">
        <div class="sprint__start">
          <h3 class="sprint__start_title">Sprint</h3>
          <select class="sprint__category" name="sprint-category" id="sprint-category">${this.setCategory()}</select>
          <button class="sprint__start_button" id="sprint-start-button">Ok</button>
        </div>
      </div>`;
        this.result = '';
        this.api = new API();
        this.group = 0;
        this.value = 0;
        this.page = 0;
    }

    setCategory() {
        const categories = [0, 1, 2, 3, 4, 5];
        categories.forEach((category) => {
            this.value = category + 1;
            this.result += `<option class="sprint__category_option" value="${this.value}">${this.value}</option>`;
        });
        return this.result;
    }

    /*async clickButtonStart() {
        this.group = this.value - 1;
        const arrayWord = await this.api.getWordList(this.group, this.page);
        const sprintGame = new SprintGame(arrayWord);
        return sprintGame;
    }*/
}
