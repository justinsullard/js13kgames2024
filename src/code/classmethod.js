import Method from "./method.js";
import Invocation from "../bs/invocation.js";
export const ClassMethodKind = [
    "constructor",
    "get",
    "method",
    "set"
];
export const ClassMethod = Invocation("ClassMethod", [Method], [
    ["static", false], // boolean
]);
export default ClassMethod;