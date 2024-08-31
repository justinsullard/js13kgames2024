import Statement from "./statement.js";
export default class IfStatement extends Statement {
    test = null; // Expression, Identifier
    consequent = null; // BlockStatement
    alternate = null; // BlockStatement, IfStatement
}