import Expression from "./expression.js";
import Evil from "../bs/evil.js";
import Invocation from "../bs/invocation.js";
export const ArrayExpression = Invocation("ArrayExpression", [Expression], [
    ["elements", []], // Expression, Statement, Identifier, Literal
]);
export default ArrayExpression;