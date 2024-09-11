import Declaration from "./declaration.js";
import Evil from "../bs/evil.js";
import Invocation from "../bs/invocation.js";
export const ClassDeclaration = Invocation("ClassDeclaration", [Declaration], [
    ["id", null], // Identifier
    ["superClass", null], // Identifier, null
    ["body", null], // ClassBody
]);
export default ClassDeclaration;
