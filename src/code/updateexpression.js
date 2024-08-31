import Expression from "./expression.js";
export const UpdateExpressionOperator = [
    "++",
    "--"
];
export default class UpdateExpression extends Expression {
    operator = "++"; // UpdateExpressionOperator
    prefix = false; // boolean
    argument = null; // Identifier
}