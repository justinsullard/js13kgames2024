import Literal from "./literal.js";
export default class TemplateLiteral extends Literal {
    expression = []; // Expression, Identifier
    quasis = []; // TemplateElement
}