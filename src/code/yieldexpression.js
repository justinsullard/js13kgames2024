import Expression from "./expression.js";
export default class YieldExpression extends Expression {
    delegate = false; // boolean
    argument = null; // Expression, Literal, Statement
}