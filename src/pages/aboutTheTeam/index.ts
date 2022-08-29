import API from "../../application/api";
import BasePage from "../basePage";
import { ICard } from "./types";
import { INFORMATION } from "./constants";

class AboutTheTeam extends BasePage {
  template: string;
  res: string;
  constructor(api: API) {
    super(api);    
    this.template = '';
    this.res = '';
  }
  init(query:URLSearchParams){
    super.init(query);
    const MAIN = document.querySelector('.main') as HTMLElement;
    MAIN.innerHTML = `
      <h2>О команде</h2>
      <div class="about__wrapper">${this.renderCard()}</div>
    `;
  }

  renderCard() {
    INFORMATION.forEach((card: ICard ) => {
      this.template = `<div class="about__card">
        <h3 class="about__card_name">${card.name}</h3>
        <img src="${card.img}" alt="${card.name}" style="about__card_img">
        <h4 class="about__card_link"><a href="${card.gitHubLink}">${card.gitHub}</a></h4>
        <h5 class="about__card_role">${card.role}</h5>
        <div class="about__card_description">
          <p class="about__card_text">${card.work}</p>
        </div>      
      </div>`;   
       this.res += this.template;
    }) 
    return this.res;
  } 
}

export default AboutTheTeam;