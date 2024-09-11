import Property from "./property.js";
import Invocation from "../bs/invocation.js";
export const ClassProperty = Invocation("ClassProperty", [Property], [
    ["static", false], // boolean
]);
export default ClassProperty;