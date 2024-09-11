import Evil from "./evil.js";
import Invocation from "./invocation.js";
import { ID } from "./store.js";
export const Thing = Invocation("Thing", [], [
    ["id", (x) => ID(x)], // number
    ["name", null], // string
]);
export default Thing;