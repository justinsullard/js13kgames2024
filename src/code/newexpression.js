import Expression from "./expression.js";

export default class NewExpression extends Expression {
    callee = null; // Identifier
    arguments = []; // Expression, Identifier, Literal, SpreadElement
}