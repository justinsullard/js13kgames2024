import Expression from "./expression";
export default class ArrowFunctionExpression extends Expression {
    // id = null;
    generator = false; // boolean
    async = false; // boolean
    params = []; // Pattern, Identifier, RestElement
    body = []; // Expression, Statement, Identifier, Literal
}