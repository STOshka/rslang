import { Constants } from '../utils/constants';
import { IWord } from '../utils/types';

class API {
    url: string;
    constructor(url = Constants.URL) {
        this.url = url;
    }
    async getRequest(type: string, options: RequestInit): Promise<Response> {
        const response = await fetch(`${this.url}${type}`, options);
        return response;
    }
    async createUser(name: string, email: string, password: string): Promise<Response> {
        const response = await this.getRequest(`users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        return response;
    }
    async loginUser(email: string, password: string): Promise<Response> {
        const response = await this.getRequest(`signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        return response;
    }
    async getWordList(group: number, page: number): Promise<IWord[]> {
        const response = await this.getRequest(`words?group=${group}&page=${page}`, {
            method: 'GET',
        });
        const result: IWord[] = await response.json();
        return result;
    }
}

export default API;
