import Expression from "./expression";
export const BinaryExpressionOperator = Object.freeze([
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
]);
export default class BinaryExpression extends Expression {
    left = null; // Identifier, Literal, Expression
    operator = "=="; // BinaryExpressionOperator
    right = null; // Expression, Literal, Identifier
}