import Expression from "./expression.js";
import Invocation from "../bs/invocation.js";
export const CallExpression = Invocation("CallExpression", [Expression], [
    ["callee", null], // ArrowFunctionExpression, CallExpression, Identifier, MemberExpression, Super
    ["arguments", []], // Expression, Literal, Identifier, SpreadElement
]);
export default CallExpression;