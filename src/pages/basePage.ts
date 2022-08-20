import API from '../application/api';

abstract class BasePage {
    api: API;
    constructor(api: API) {
        this.api = api;
    }
    abstract init(): void;
}

export default BasePage;
