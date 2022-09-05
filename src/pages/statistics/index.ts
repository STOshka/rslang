import API from '../../application/api';
import Authorization from '../../application/auth';
import BasePage from '../basePage';
import { FullGameStats } from '../../utils/types';
import { createHTMLElement } from '../../utils/helpers';
import './index.css';

class Statistics extends BasePage {
    stat: FullGameStats | undefined;
    constructor(api: API) {
        super(api);
    }

    async init(query: URLSearchParams) {
        super.init(query);
        const MAIN = document.querySelector('.main') as HTMLElement;
        if (!Authorization.instance.isAuth()) {
            MAIN.innerHTML = `
                <div class="statistics__background">
                    <h2 class="statistics__title">
                        Статистика доступна только авторизованным пользоватям
                    </h2>
                </div>
            `;
            return;
        }
        this.stat = await (await this.api.getStatistic()).json();
        MAIN.innerHTML = `
        <div class="statistics__background">
            <h2 class="statistics__title">Статистика</h2>
            <div class="statistics__wrapper">
                <div class="statistics__block statistics__block__common">
                    <h3 class="statistics__block__title">Общая статистика</h3>
                </div>
                <div class="statistics__block statistics__block__audiochallenge">
                    <h3 class="statistics__block__title">Аудиовызов</h3>
                </div>
                <div class="statistics__block statistics__block__sprint">
                    <h3 class="statistics__block__title">Спринт</h3>
                </div>
            </div>
        </div>
        `;

        ['common', 'audiochallenge', 'sprint'].forEach((type) => {
            (MAIN.querySelector(`.statistics__block__${type}`) as HTMLElement).append(this.renderStatistics(type));
        });
    }

    renderStatistics(type: string) {
        const table = createHTMLElement(
            'table',
            'statistics__block__info',
            `<table class="statistics__block__info">
            <thead class="statistics__block__header">
                <tr>
                    <td class="statistics__block__cell cell_title">Дата</td>
                    <td class="statistics__block__cell cell_title">Новых слов</td>
                    <td class="statistics__block__cell cell_title">Изучено слов</td>
                    <td class="statistics__block__cell cell_title">Правильных ответов</td>
                    <td class="statistics__block__cell cell_title">Серия правильных ответов (max)</td>
                </tr>
            </thead>
            <tbody class="statistics__block__body"></tbody>
        </table>`
        );
        const body = table.querySelector('.statistics__block__body') as HTMLElement;
        this.renderDayStatistics(type, body);
        return table;
    }

    renderDayStatistics(type: string, body: HTMLElement) {
        const data = this.stat?.optional.games[type];
        data &&
            Object.keys(data).forEach((key) => {
                const TR = createHTMLElement(
                    'tr',
                    'statistics__block__row',
                    `
                    <td class="statistics__block__cell">${key}</td>                   
                    <td class="statistics__block__cell">${data[key].newWords}</td>
                    <td class="statistics__block__cell">${data[key].learningWords}</td>
                    <td class="statistics__block__cell">${this.correctPercent(
                        data[key].correct,
                        data[key].answers
                    )}%</td>
                    <td class="statistics__block__cell">${data[key].streak}</td>`
                );
                body.append(TR);
            });
    }

    correctPercent(correct: number, answers: number): number {
        if (!Boolean(correct) || !Boolean(answers)) return 0;
        return Math.floor((correct / answers) * 100);
    }
}
export default Statistics;
