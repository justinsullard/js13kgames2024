import MemberExpression from "./memberexpression.js";
import Invocation from "../bs/invocation.js";
export const OptionalMemberExpression = Invocation("OptionalMemberExpression", [MemberExpression], [
    ["optional", true], // boolean
]);
export default OptionalMemberExpression;