import Statement from "./statement.js";
import Evil from "../bs/evil.js";
import Invocation from "../bs/invocation.js";
export const BlockStatement = Invocation("BlockStatement", [Statement], [
    ["body", []], // Statement, Declaration, Comment
]);
export default BlockStatement;