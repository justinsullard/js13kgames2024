import Expression from "./expression";
export default class ArrowFunctionExpression extends Expression {
    // id = null;
    generator = false;
    async = false;
    params = []; // Pattern, Identifier, RestElement
    body = []; // Expression, Statement, Identifier, Literal
}