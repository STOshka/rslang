import { Constants } from '../utils/constants';

class API {
    url: string;
    constructor(url = Constants.URL) {
        this.url = url;
    }
    async getRequest(type: string, options: RequestInit): Promise<Response> {
        const response = await fetch(`${this.url}${type}`, options);
        return response;
    }
    async getWordList(group: number, page: number) {
        const response = await this.getRequest(`words?group=${group}&page=${page}`, {
            method: 'GET',
        });
        return response.json();
    }
}

export default API;
