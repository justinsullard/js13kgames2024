import Declaration from "./declaration.js";
import Invocation from "../bs/invocation.js";
export const ExportNamedDeclaration = Invocation("ExportNamedDeclaration", [Declaration], [
    ["specifiers", []], // ExportSpecifier
    ["declaration", null], // Declaration
]);
export default ExportNamedDeclaration;