import Statement from "./statement.js";
export default class ForStatement extends Statement {
    init = null; // AssignmentExpression, VariableDeclaration
    test = null; // BinaryExpression, UpdateExpression
    update = null; // UpdateExpression, null
    body = null; // BlockStatement
}