import API from '../../application/api';
import BasePage from '../basePage';
import { ICard } from './types';
import { INFORMATION } from './constants';
import './about-team.css';

class AboutTheTeam extends BasePage {
    template: string;
    res: string;
    constructor(api: API) {
        super(api);
        this.template = '';
        this.res = '';
    }
    init(query: URLSearchParams) {
        super.init(query);
        const MAIN = document.querySelector('.main') as HTMLElement;
        MAIN.innerHTML = `
        <div class="about__wrapper">
            <h2 class="about_title">О команде</h2>
            ${this.renderCard()}
        </div>
    `;
    }

    renderCard() {
        INFORMATION.forEach((card: ICard) => {
            this.template = `
            <div class="about__card">
                <div class="about__card_img">
                    <img class="img" src="${card.img}" alt="${card.name}">
                </div>
                <div class="about__card_text">
                    <h3 class="about__card_name">${card.name}</h3>
                    <a class="about__card_link" href="${card.gitHubLink}">                 
                        <h5 class="about__card_role">${card.role}</h5>
                    </a>
                    <p class="about__card_details">${card.work}</p>      
                </div>      
            </div>
            `;

            this.res += this.template;
        });

        return this.res;
    }
}

export default AboutTheTeam;
