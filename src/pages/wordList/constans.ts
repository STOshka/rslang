import API from "../../application/api";
import { IWord } from "../../utils/types";

export const api = new API;
export const pageData = { group: 0, page: 0 };
export const wordsData: Array<IWord> = [];
