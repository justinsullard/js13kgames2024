import Expression from "./expression.js";
import Invocation from "../bs/invocation.js";
export const ConditionalExpression = Invocation("ConditionalExpression", [Expression], [
    ["test", null], // BinaryExpression, CallExpression, Identifier, LogicalExpression, MemberExpression, OptionalMemberExpression
    ["consequent", null], // Expression, Identifier, Literal
    ["alternate", null], // Expression, Identifier, Literal
]);
export default ConditionalExpression;