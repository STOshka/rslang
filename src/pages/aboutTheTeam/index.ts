import API from "../../application/api";
import BasePage from "../basePage";

class AboutTheTeam extends BasePage {
  constructor(api: API) {
    super(api);
  }
  init(query:URLSearchParams){
    super.init(query);
    const MAIN = document.querySelector('.main') as HTMLElement;
    MAIN.innerHTML = 'ABOUT THE TEAM';
  }
}

export default AboutTheTeam;