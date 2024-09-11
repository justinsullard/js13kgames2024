import Expression from "./expression.js";
export const LogicalExpressionOperator = [
    "&&",
    "??",
    "||"
];
import Invocation from "../bs/invocation.js";
export const LogicalExpression = Invocation("LogicalExpression", [Expression], [
    ["left", null], // Expression, Literal, Identifier
    ["operator", "&&"], // LogicalExpressionOperator
    ["right", null], // Expression, Literal, Identifier
]);
export default LogicalExpression;