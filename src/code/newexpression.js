import Expression from "./expression.js";
import Invocation from "../bs/invocation.js";
export const NewExpression = Invocation("NewExpression", [Expression], [
    ["callee", null], // Identifier
    ["arguments", []], // Expression, Identifier, Literal, SpreadElement
]);
export default NewExpression;