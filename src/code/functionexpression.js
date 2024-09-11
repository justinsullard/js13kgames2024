import Expression from "./expression.js";
import Invocation from "../bs/invocation.js";
export const FunctionExpression = Invocation("FunctionExpression", [Expression], [
    ["generator", false], // boolean
    ["async", false], // boolean
    ["id", null], // Identifier
    ["params", []], // Identifier, Pattern
    ["body", null], // BlockStatement
]);
export default FunctionExpression;