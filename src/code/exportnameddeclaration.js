import Declaration from "./declaration.js";
export default class ExportNamedDeclaration extends Declaration {
    specifiers = []; // ExportSpecifier
    // source = null; // unknown
    declaration = null; // Declaration
}