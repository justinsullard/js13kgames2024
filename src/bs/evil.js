import each from "../util/each.js";
import filter from "../util/filter.js";
import flat from "../util/flat.js";
import isfunction from "../util/isfunction.js";
import join from "../util/join.js";
import map from "../util/map.js";
import { ID } from "./store.js";
export const Evil = (_) => eval(`(_=${_},_)`);
export default Evil;