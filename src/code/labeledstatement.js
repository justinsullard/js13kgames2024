import Statement from "./statement.js";
export default class LabeledStatement extends Statement {
    body = null; // Statement
    label = null; // Identifier
}