import Statement from "./statement";
export default class BlockStatement extends Statement {
    body = []; // Statement, Declaration
    innerComments = []; // Comment
}