import Invocation from "../bs/invocation.js";
export const MethodKind = [
    "constructor",
    "get",
    "method",
    "set"
];
export const Method = Invocation("Method", [], [
    ["key", null], // Identifier, MemberExpression
    ["computed", false], // boolean
    ["kind", MethodKind[2]], // MethodKind
    ["generator", false], // boolean
    ["async", false], // boolean
    ["params", []], // AssignmentPattern, Identifier, RestElement
    ["body", null], // BlockStatement
]);
export default Method;