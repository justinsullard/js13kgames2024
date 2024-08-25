import Expression from "./expression";
export const AssignmentExpressionOperator = Object.freeze([
    "=",
    "+=",
    "-=",
    "*=",
    "/=",
    "|=",
    "^=",
]);
export default class AssignmentExpression extends Expression {
    left = null; // Identifier, MemberExpression
    operator = "="; // AssignmentExpressionOperator
    right = null; // Expression, Literal, Identifier
}