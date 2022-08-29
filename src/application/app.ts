import API from './api';
import LocalStorage from './localStorage';
import { pages } from './pages';
import Router from './router';

class App {
    mainAPI: API;
    router: Router;
    constructor() {
        new LocalStorage();
        this.mainAPI = new API();
        this.router = new Router();
        this.registerPages();
        this.router.onRouteChange();
    }
    registerPages() {
        pages.forEach((page) => this.router?.addRoute(page.route, new page.page(this.mainAPI)));
    }
}

export default App;
