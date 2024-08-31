export default class ObjectProperty {
    key = null; // Identifier, MemberExpression, StringLiteral, TemplateLiteral
    computed = false; // boolean
    method = false; // boolean
    shorthand = false; // boolean
    value = null; // Expression, Pattern, Literal, Identifier
}