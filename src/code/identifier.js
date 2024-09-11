import Evil from "../bs/evil.js";
import Invocation from "../bs/invocation.js";
export const IdentifierSpecials = [
    "arguments", // (not a keyword, but cannot be declared as identifier in strict mode)
    "as", // (import * as ns from "mod")
    "async", // not a keyword, but maybe should be
    "eval", // (not a keyword, but cannot be declared as identifier in strict mode)
    "from", // (import x from "mod")
    "get",
    "of",
    "set",
];
export const Identifier = Invocation("Identifier", [], ["name", ""]);
export default Identifier;