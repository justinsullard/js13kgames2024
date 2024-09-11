import Statement from "./statement.js";
import Invocation from "../bs/invocation.js";
export const LabeledStatement = Invocation("LabeledStatement", [Statement], [
    ["body", null], // Statement
    ["label", null], // Identifier
]);
export default LabeledStatement;