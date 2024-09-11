import Expression from "./expression.js";
import Invocation from "../bs/invocation.js";
export const MemberExpression = Invocation("MemberExpression", [Expression], [
    ["object", null], // Expression, Identifier, Literal
    ["computed", false], // boolean
    ["property", null], // Expression, Identifer, Literal
]);
export default MemberExpression;