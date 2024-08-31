import Expression from "./expression.js";
export default class FunctionExpression extends Expression {
    id = null; // Identifier
    generator = false; // boolean
    async = false; // boolean
    params = []; // Identifier, Pattern
    body = null; // BlockStatement
}