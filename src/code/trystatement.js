import Statement from "./statement.js";
export default class TryStatement extends Statement {
    block = null; // BlockStatement
    handler = null; // CatchClause
    finalizer = null; // null, BlockStatement
}