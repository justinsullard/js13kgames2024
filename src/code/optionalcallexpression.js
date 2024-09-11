import CallExpression from "./callexpression.js";
import Invocation from "../bs/invocation.js";
export const OptionalCallExpression = Invocation("OptionalCallExpression", [CallExpression], [
    ["optional", true], // boolean
]);
export default OptionalCallExpression;