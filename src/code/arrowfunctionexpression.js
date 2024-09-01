import Expression from "./expression.js";
export default class ArrowFunctionExpression extends Expression {
    // id = null;
    generator = false; // boolean
    async = false; // boolean
    params = []; // Pattern, Identifier, RestElement
    body = []; // Expression, Statement, Identifier, Literal
}