import Expression from "./expression.js";
import Invocation from "../bs/invocation.js";
export const ObjectExpression = Invocation("ObjectExpression", [Expression], [
    ["properties", []], // ObjectMethod, ObjectProperty, SpreadElement
]);
export default ObjectExpression;