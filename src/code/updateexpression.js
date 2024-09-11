import Expression from "./expression.js";
import Invocation from "../bs/invocation.js";
export const UpdateExpressionOperator = [
    "++",
    "--"
];
export const UpdateExpression = Invocation("UpdateExpression", [Expression], [
    ["operator", "++"], // UpdateExpressionOperator
    ["prefix", false], // boolean
    ["argument", null], // Identifier
]);
export default UpdateExpression;