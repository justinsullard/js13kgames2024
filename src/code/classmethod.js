import Method from "./method.js";
export const ClassMethodKind = Object.freeze([
    "constructor",
    "get",
    "method",
    "set"
]);
export default class ClassMethod extends Method {
    // id = null;
    static = false; // boolean
    key = null; // Identifier, MemberExpression
    computed = false; // boolean
    kind = "method"; // ClassMethodKind
    generator = false; // boolean
    async = false; // boolean
    params = []; // AssignmentPattern, Identifier, RestElement
    body = null; // BlockStatement
}