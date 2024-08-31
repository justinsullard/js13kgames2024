import Expression from "./expression.js";
export default class MemberExpression extends Expression {
    object = null; // Expression, Identifier, Literal
    computed = false; // boolean
    property = null; // Expression, Identifer, Literal
}