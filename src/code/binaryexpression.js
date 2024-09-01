import Expression from "./expression.js";
export const BinaryExpressionOperator = [
    "!==",
    "%",
    "&",
    "*",
    "**",
    "+",
    "-",
    "/",
    "<",
    "<<",
    "<=",
    "==",
    "===",
    ">",
    ">=",
    ">>",
    ">>>",
    "^",
    "instanceof",
    "|"
];
export default class BinaryExpression extends Expression {
    left = null; // Identifier, Literal, Expression
    operator = "=="; // BinaryExpressionOperator
    right = null; // Expression, Literal, Identifier
}