import Expression from "./expression.js";
export default class CallExpression extends Statement {
    callee = null; // ArrowFunctionExpression, CallExpression, Identifier, MemberExpression, Super
    arguments = []; // Expression, Literal, Identifier, SpreadElement
}