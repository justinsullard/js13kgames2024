import Declaration from "./declaration.js";
export default class FunctionDeclaration extends Declaration {
    id = null; // Identifier
    generator = false; // boolean
    async = false; // boolean
    params = []; // Identifier, Pattern
    body = null; // BlockStatement
}