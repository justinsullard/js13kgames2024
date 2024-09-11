import Invocation from "../bs/invocation.js";
export const VariableDeclarator = Invocation("VariableDeclarator", [], [
    ["id", null], // Pattern, Identifier
    ["init", null], // null, Expression, Literal, Identifier
]);
export default VariableDeclarator;