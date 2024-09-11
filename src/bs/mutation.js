import Evil from "./evil.js";
import Invocation from "./invocation.js";
import Thing from "./thing.js";
import split from "../util/split.js";
const Operators = split(``);
export const Mutation = Invocation(
    "Mutation", 
    [Thing],
    [
        ["left", null], // Thing, Prop
        ["operator", Operators[0]], // Operators
        ["right", null], // Literal, Prop
    ]
);
export default Mutation;