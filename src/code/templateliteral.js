import Literal from "./literal.js";
import Invocation from "../bs/invocation.js";
export const TemplateLiteral = Invocation("TemplateLiteral", [Literal], [
    ["expression", []], // Expression, Identifier
    ["quasis", []], // TemplateElement
]);
export default TemplateLiteral;