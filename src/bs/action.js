import Evil from "./evil.js";
import Invocation from "./invocation.js";
import Thing from "./thing.js";
export const Action = Invocation("Action", [Thing], [
    ["inputs", []], // Thing, Prop
    ["mutations", []], // Mutation
    ["outputs", []], // Thing, Prop
]);
export default Action;