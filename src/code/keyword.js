export const Keywords = [
    // reserved
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "export",
    "extends",
    "false",
    "finally",
    "for",
    "function",
    "if",
    "import",
    "in",
    "instanceof",
    "new",
    "null",
    "return",
    "super",
    "switch",
    "this",
    "throw",
    "true",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with",
    // strict mode
    "const",
    "let",
    "static",
    "yield",
    // module/async body
    "await",
    // future
    "enum",
    "implements",
    "interface",
    "package",
    "private",
    "protected",
    "public",
];
import Invocation from "../bs/invocation.js";
export const Keyword = Invocation("Keyword", [], [
    ["word", null], // string
]);
export default Keyword;