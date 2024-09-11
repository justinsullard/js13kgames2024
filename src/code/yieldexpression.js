import Expression from "./expression.js";
import Invocation from "../bs/invocation.js";
export const YieldExpression = Invocation("YieldExpression", [Expression], [
    ["delegate", false], // boolean
    ["argument", null], // Expression, Literal, Statement
]);
export default YieldExpression;