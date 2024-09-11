import Expression from "./expression.js";
import Evil from "../bs/evil.js";
import Invocation from "../bs/invocation.js";
export const AssignmentExpressionOperator = [
    "=",
    "+=",
    "-=",
    "*=",
    "/=",
    "|=",
    "^=",
    "&=",
];
export const AssignmentExpression = Invocation("AssignmentExpression", [Expression], [
    ["left", null], // Pattern, Identifier, MemberExpression, !AssignmentPattern
    ["operator", AssignmentExpressionOperator[0]], // AssignmentExpressionOperator
    ["right", null], // Expression, Literal, Identifier
]);
export default AssignmentExpression;