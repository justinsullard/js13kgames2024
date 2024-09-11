import Expression from "./expression.js";
import Evil from "../bs/evil.js";
import Invocation from "../bs/invocation.js";
export const BinaryExpressionOperator = [
    "===",
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
    ">",
    ">=",
    ">>",
    ">>>",
    "^",
    "instanceof",
    "|"
];
export const BinaryExpression = Invocation("BinaryExpression", [Expression], [
    ["left", null], // Identifier, Literal, Expression
    ["operator", BinaryExpressionOperator[0]], // BinaryExpressionOperator
    ["right", null], // Expression, Literal, Identifier
]);
export default BinaryExpression;