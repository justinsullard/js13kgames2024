import Invocation from "./invocation.js";
export const Action = Invocation("Action", [], [
    ["name", null],
    ["inputs", []], // Thing, Prop
    ["mutations", []], // Mutation
    ["outputs", []], // Thing, Prop
]);
export default Action;