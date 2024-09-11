import Declaration from "./declaration.js";
import Invocation from "../bs/invocation.js";
export const VariableDeclarationKind = [
    "const",
    "let",
    "var"
];
export const VariableDeclaration = Invocation("VariableDeclaration", [Declaration], [
    ["kind", "var"], // VariableDeclarationKind
    ["declarations", []], // VariableDeclarator
]);
export default VariableDeclaration;