import Evil from "../bs/evil.js";
import Invocation from "../bs/invocation.js";
export const Property = Invocation("Property", [], [
    ["key", null], //  Identifier, MemberExpression, StringLiteral, TemplateLiteral
    ["computed", false], // boolean
    ["value", null], // Expression, Literal
    ["trailingComments", []], // Comment
    ["leadingComments", []], // Comment
]);
export default Property;