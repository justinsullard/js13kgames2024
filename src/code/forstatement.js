import Statement from "./statement.js";
import Invocation from "../bs/invocation.js";
export const ForStatement = Invocation("ForStatement", [Statement], [
    ["init", null], // AssignmentExpression, VariableDeclaration
    ["test", null], // BinaryExpression, UpdateExpression
    ["update", null], // UpdateExpression, null
    ["body", null], // BlockStatement
]);
export default ForStatement;