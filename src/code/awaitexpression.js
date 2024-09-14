import Expression from "./expression.js";
import Invocation from "../bs/invocation.js";
export const AwaitExpression = Invocation("AwaitExpression", [Expression], [
    ["argument", null], // CallExpression
]);
export default AwaitExpression;