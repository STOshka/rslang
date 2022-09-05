import { Constants } from '../utils/constants';
import { UserWord, FullGameStats, WordDifficulty } from '../utils/types';
import Authorization from './auth';

class API {
    url: string;
    constructor(url = Constants.URL) {
        this.url = url;
    }
    async getRequest(type: string, options: RequestInit): Promise<Response> {
        const response = await fetch(`${this.url}${type}`, options);
        return response;
    }
    async generateToken(): Promise<Response> {
        const response = await this.getRequest(`users/${Authorization.instance.getUserId()}/tokens`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Authorization.instance.getRefreshToken()}`,
            },
        });
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
    async getWordList(group: number, page: number): Promise<Response> {
        const response = await this.getRequest(`words?group=${group}&page=${page}`, {
            method: 'GET',
        });
        return response;
    }
    async getAggregatedWords(group: number, page: number): Promise<Response> {
        const response = await this.getRequest(
            `users/${Authorization.instance.getUserId()}/aggregatedWords?wordsPerPage=20&filter={"$and":[{"page":${page}}, {"group":${group}}]}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${Authorization.instance.getUserToken()}`,
                },
            }
        );
        return response;
    }
    async getAllAggregatedWords(group: number): Promise<Response> {
        const response = await this.getRequest(
            `users/${Authorization.instance.getUserId()}/aggregatedWords?wordsPerPage=600&filter={"$and":[{"group":${group}}]}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${Authorization.instance.getUserToken()}`,
                },
            }
        );
        return response;
    }
    async getAggregatedHardWords(): Promise<Response> {
        const response = await this.getRequest(
            `users/${Authorization.instance.getUserId()}/aggregatedWords?filter={"$and":[{"userWord.difficulty":"${
                WordDifficulty.hard
            }"}]}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${Authorization.instance.getUserToken()}`,
                },
            }
        );
        return response;
    }
    async getWordById(wordId: string): Promise<Response> {
        const response = await this.getRequest(`users/${Authorization.instance.getUserId()}/words/${wordId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Authorization.instance.getUserToken()}`,
            },
        });
        return response;
    }
    async changeWordById(wordId: string, method: string, data: UserWord): Promise<Response> {
        const response = await this.getRequest(`users/${Authorization.instance.getUserId()}/words/${wordId}`, {
            method: method,
            headers: {
                Authorization: `Bearer ${Authorization.instance.getUserToken()}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response;
    }
    async createWordById(wordId: string, data: UserWord): Promise<Response> {
        return this.changeWordById(wordId, 'POST', data);
    }
    async updateWordById(wordId: string, data: UserWord): Promise<Response> {
        return this.changeWordById(wordId, 'PUT', data);
    }
    async getStatistic(): Promise<Response> {
        const response = await this.getRequest(`users/${Authorization.instance.getUserId()}/statistics`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Authorization.instance.getUserToken()}`,
            },
        });
        return response;
    }
    async updateStatistic(data: FullGameStats): Promise<Response> {
        const response = await this.getRequest(`users/${Authorization.instance.getUserId()}/statistics`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${Authorization.instance.getUserToken()}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response;
    }
}

export default API;
