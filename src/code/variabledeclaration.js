import Declaration from "./declaration.js";
export const VariableDeclarationKind = [
    "const",
    "let",
    "var"
];
export default class VariableDeclaration extends Declaration {
    declarations = []; // VariableDeclarator
    kind = "var"; // VariableDeclarationKind
}