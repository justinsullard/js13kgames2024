import Expression from "./expression.js";
import Evil from "../bs/evil.js";
import Invocation from "../bs/invocation.js";
export const ArrowFunctionExpression = Invocation("ArrowFunctionExpression", [Expression], [
    ["generator", false], // boolean
    ["async", false], // boolean
    ["params", []], // Pattern, Identifier, RestElement
    ["body", []], // Expression, Statement, Identifier, Literal, Comment
]);
export default ArrowFunctionExpression;