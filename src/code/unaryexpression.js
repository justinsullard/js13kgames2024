import Expression from "./expression.js";
import Invocation from "../bs/invocation.js";
export const UnaryExpressionOperator = [
    "!",
    "-",
    "typeof",
    "~",
];
export const UnaryExpression = Invocation("UnaryExpression", [Expression], [
    ["operator", UnaryExpressionOperator[0]], // UnaryExpressionOperator
    ["prefix", false], // boolean
    ["argument", null], // Expression, Identifier, Literal
]);
export default UnaryExpression;