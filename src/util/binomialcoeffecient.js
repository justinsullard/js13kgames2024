// Binomial Coefficient
import factorial from "./factorial.js";
export const binomialcoefficient = (choose, from) => {
    return factorial(from) / (factorial(choose) * factorial(from - choose))
};
export default binomialcoefficient;
