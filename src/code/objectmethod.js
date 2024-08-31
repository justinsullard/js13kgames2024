import Method from "./method.js";
export const ObjectMethodKind = [
    "get",
    "method",
    "set"
];
export default class ObjectMethod extends Method {
    // id = null; // null ?
    method = true; // boolean
    key = null; // Identifier
    computed = false; // boolean
    kind = "method"; // ObjectMethodKind
    generator = false; // boolean
    async = false; // boolean
    params = []; // Identifier
    body = null; // BlockStatement
}