import Declaration from "./declaration.js";
import Invocation from "../bs/invocation.js";
export const ExportDefaultDeclaration = Invocation("ExportDefaultDeclaration", [Declaration], [
    ["declaration", null], // Identifier, ClassDeclaration
]);
export default ExportDefaultDeclaration;
