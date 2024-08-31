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
}