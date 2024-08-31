import Expression from "./expression.js";
export default class ConditionalExpression extends Expression {
    test = null; // BinaryExpression, CallExpression, Identifier, LogicalExpression, MemberExpression, OptionalMemberExpression
    consequent = null; // Expression, Identifier, Literal
    alternate = null; // Expression, Identifier, Literal
}