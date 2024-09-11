import Statement from "./statement.js";;
import Invocation from "../bs/invocation.js";
export const ForOfStatement = Invocation("ForOfStatement", [Statement], [
    ["await", false], // boolean
    ["left", null], // VariableDeclaration
    ["right", null], // Expression, Literal, Identifier
    ["body", null], // BlockStatement, EmptyStatement
]);
export default ForOfStatement;