import { Constants } from '../utils/constants';
import { IWordsInf } from '../utils/types';

class API {
    url: string;
    constructor(url = Constants.URL) {
        this.url = url;
    }
    async getRequest(type: string, options: RequestInit): Promise<Response> {
        const response = await fetch(`${this.url}${type}`, options);
        return response;
    }
    async getWordList(group: number, page: number): Promise<IWordsInf[]> {
        const response = await this.getRequest(`words?group=${group}&page=${page}`, {
            method: 'GET',
        });
        const result: IWordsInf[] = await response.json();
        return result;
    }
}

export default API;
