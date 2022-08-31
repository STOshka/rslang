import API from "../../application/api";
import BasePage from "../basePage";

class Statistics extends BasePage {
  constructor(api: API) {
    super(api);
  }

  init(query: URLSearchParams) {
    super.init(query);
    const MAIN = document.querySelector('.main') as HTMLElement;
    MAIN.innerHTML = `<h2 class="statistics__title">Статистика</h2>
      <div class="statistics__wrapper">
        <div class="statistics__block">
          <h3 class="statistics__block_title">Общая статистика</h3>
          ${this.renderStatistics()}
        </div>
        <div class="statistics__block">
          <h3 class="statistics__block_title">Аудиовызов</h3>
          ${this.renderStatistics()}
        </div>
        <div class="statistics__block">
          <h3 class="statistics__block_title">Спринт</h3>
          ${this.renderStatistics()}
        </div>
      </div>`;
  }

  renderStatistics(countGames = 0, words = 0, rightAnswers = 0, length = 0){
    return `<table class="statistics__block_info">
        <tr class="statistics__block_row">
          <td class="statistics__block_cell">Колличество сыгранных игр:</td>
          <td class="statistics__block_cell">${countGames}</td>
        </tr>
        <tr class="statistics__block_row">
          <td class="statistics__block_cell">Колличество изученных слов:</td>
          <td class="statistics__block_cell">${words}</td>
        </tr>
        <tr class="statistics__block_row">
          <td class="statistics__block_cell">Правильных ответов:</td>
          <td class="statistics__block_cell">${rightAnswers}%</td>
        </tr>
        <tr class="statistics__block_row">
          <td class="statistics__block_cell">Самая длинная серия ответов:</td>
          <td class="statistics__block_cell">${length}</td>
        </tr>
    </table>`;
  }
}
export default Statistics;