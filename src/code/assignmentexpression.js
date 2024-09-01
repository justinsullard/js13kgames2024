import Expression from "./expression.js";
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
export default class AssignmentExpression extends Expression {
    left = null; // Pattern, Identifier, MemberExpression, !AssignmentPattern
    operator = "="; // AssignmentExpressionOperator
    right = null; // Expression, Literal, Identifier
}