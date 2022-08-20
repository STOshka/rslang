import Page from '../pages/basePage';
import { ROUTES } from '../utils/types';

class Router {
    routes: Record<string, Page>;
    constructor() {
        this.routes = {};
        window.addEventListener('hashchange', this.onRouteChange.bind(this));
    }
    addRoute(url: string, model: Page) {
        this.routes[`${url}`] = model;
    }
    onRouteChange() {
        const { url } = this.getUrlParts();
        if (this.routes[url]) {
            this.routes[url].init();
        } else {
            this.moveToErrorPage();
        }
    }
    moveToErrorPage() {
        window.location.hash = ROUTES.ERROR;
    }
    getUrlParts() {
        const [url, query] = window.location.hash.split('?');
        return { url, query };
    }
}

export default Router;
