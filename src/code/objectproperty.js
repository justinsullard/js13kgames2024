import Property from "./property.js";
import Invocation from "../bs/invocation.js";
export const ObjectProperty = Invocation("ObjectProperty", [Property], [
    ["shorthand", false], // boolean
]);
export default ObjectProperty;