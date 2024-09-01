import Statement from "./statement.js";
export default class BlockStatement extends Statement {
    body = []; // Statement, Declaration
    innerComments = []; // Comment
}