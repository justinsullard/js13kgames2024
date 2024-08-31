import Expression from "./expression.js";
export const LogicalExpressionOperator = [
    "&&",
    "??",
    "||"
];

export default class LogicalExpression extends Expression {
    left = null; // Expression, Literal, Identifier
    operator = "&&"; // LogicalExpressionOperator
    right = null; // Expression, Literal, Identifier
}