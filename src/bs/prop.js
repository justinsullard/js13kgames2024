import Evil from "./evil.js";
import Invocation from "./invocation.js";
import { ID } from "./store.js";
export const Prop = Invocation("Prop", [], [
    ["id", (x) => ID(x)], // number
    ["name", "Prop"], // string
    ["default", null] // Literal
]);
export default Prop;