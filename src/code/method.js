export const MethodKind = Object.freeze([
    "constructor",
    "get",
    "method",
    "set"
]);
export default class Method {
    key = null; // Identifier, MemberExpression
    computed = false; // boolean
    kind = "method"; // MethodKind
    generator = false; // boolean
    async = false; // boolean
    params = []; // AssignmentPattern, Identifier, RestElement
    body = null; // BlockStatement
    leadingComments = []; // Comment
    trailingComments = []; // Comment
}