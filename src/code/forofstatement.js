import Statement from "./statement.js";;
export default class ForInStatement extends Statement {
    await = false; // boolean
    left = null; // VariableDeclaration
    right = null; // Expression, Literal, Identifier
    body = null; // BlockStatement, EmptyStatement
}