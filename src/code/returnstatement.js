import Statement from "./statement.js";
import Invocation from "../bs/invocation.js";
export const ReturnStatement = Invocation("ReturnStatement", [Statement], [
    ["argument", null], // null, Expression, Identifier, Literal
]);
export default ReturnStatement;