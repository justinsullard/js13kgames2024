import Declaration from "./declaration.js";
import Evil from "../bs/evil.js";
import Invocation from "../bs/invocation.js";
export const ImportDeclaration = Invocation("ImportDeclaration", [Declaration], [
    ["specifiers", []], // ImportDefaultSpecifier, ImportSpecifier
    ["source", null], // StringLiteral
]);
export default ImportDeclaration;