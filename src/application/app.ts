import API from './api';
import { pages } from './pages';
import Router from './router';

class App {
    mainAPI: API;
    router: Router;
    constructor() {
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
