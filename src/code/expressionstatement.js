import Statement from "./statement.js";
import Invocation from "../bs/invocation.js";
export const ExpressionStatement = Invocation("ExpressionStatement", [Statement], [
    ["expression", null], // Expression
]);
export default ExpressionStatement;