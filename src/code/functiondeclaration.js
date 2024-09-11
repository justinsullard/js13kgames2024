import Declaration from "./declaration.js";
import Invocation from "../bs/invocation.js";
export const FunctionDeclaration = Invocation("FunctionDeclaration", [Declaration], [
    ["id", null], // Identifier
    ["generator", false], // boolean
    ["async", false], // boolean
    ["params", []], // Identifier, Pattern
    ["body", null], // BlockStatement
]);
export default FunctionDeclaration;