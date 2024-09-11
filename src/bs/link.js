import Evil from "./evil.js";
import Invocation from "./invocation.js";
import { ID } from "./store.js";
export const Link = Invocation("Link", [], [
    ["id", (x) => ID(x)],
    ["head", []], // Thing
    ["tail", []] // Thing
]);
export default Link;