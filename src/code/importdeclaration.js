import Declaration from "./declaration.js";
export default class ImportDeclaration extends Declaration {
    specifiers = []; // ImportDefaultSpecifier, ImportSpecifier
    source = null; // StringLiteral
}