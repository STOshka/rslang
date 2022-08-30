import { Constants } from '../utils/constants';
import { IWord } from '../utils/types';
import LocalStorage from './localStorage';

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
        const result: IWord[] = await (LocalStorage.instance.isAuth()
            ? this.getAggregatedWords(group, page)
            : await this.getWords(group, page));
        return result;
    }
    async getWords(group: number, page: number): Promise<IWord[]> {
        const response = await this.getRequest(`words?group=${group}&page=${page}`, {
            method: 'GET',
        });
        return await response.json();
    }
    async getAggregatedWords(group: number, page: number): Promise<IWord[]> {
        const response = await this.getRequest(
            `users/${LocalStorage.instance.getUserId()}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=20`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${LocalStorage.instance.getUserToken()}`,
                },
            }
        );
        return (await response.json())[0].paginatedResults;
    }
}

export default API;
