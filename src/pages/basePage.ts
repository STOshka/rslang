import API from '../application/api';

abstract class BasePage {
    api: API;
    constructor(api: API) {
        this.api = api;
    }
    abstract init(query?: URLSearchParams): void;
}

export default BasePage;
