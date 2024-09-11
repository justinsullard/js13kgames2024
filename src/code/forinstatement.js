import Statement from "./statement.js";;
import Invocation from "../bs/invocation.js";
export const ForInStatement = Invocation("ForInStatment", [Statement], [
    ["left", null], // VariableDeclaration
    ["right", null], // Expression, Literal, Identifier
    ["body", null], // BlockStatement, EmptyStatement
]);
export default ForInStatement;