import Declaration from "./declaration.js";
export default class ClassDeclaration extends Declaration {
    id = null; // Identifier
    superClass = null; // Identifier, null
    body = null; // ClassBody
}
