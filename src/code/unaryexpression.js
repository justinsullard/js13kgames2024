import Expression from "./expression.js";
export const UnaryExpressionOperator = [
    "!",
    "-",
    "typeof",
    "~",
];
export default class UnaryExpression extends Expression {
    operator = "!"; // UnaryExpressionOperator
    prefix = false; // boolean
    argument = null; // Expression, Identifier, Literal
}