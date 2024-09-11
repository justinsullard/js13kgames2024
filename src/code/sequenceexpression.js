import Expression from "./expression.js";
import Invocation from "../bs/invocation.js";
export const SequenceExpression = Invocation("SequenceExpression", [Expression], [
    ["expressions", []], // Identifier, Expression
]);
export default SequenceExpression;