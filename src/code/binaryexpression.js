import Expression from "./expression";
export const BinaryOperators = Object.freeze([
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
    operator = "=="; // BinaryOperators
    right = null; // Expression, Literal, Identifier
}