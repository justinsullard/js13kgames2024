export default class Property {
    key = null; //  Identifier, MemberExpression, StringLiteral, TemplateLiteral
    computed = false; // boolean
    value = null; // Expression, Literal
    trailingComments = []; // Comment
    leadingComments = []; // Comment
}