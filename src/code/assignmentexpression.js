import Expression from "./expression";
export const AssignmentOperators = Object.freeze([
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
    operator = "="; // AssignmentOperators
    right = null; // Expression, Literal, Identifier
}