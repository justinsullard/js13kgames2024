import ClassMethod from "./classmethod.js";
import Invocation from "../bs/invocation.js";
export const ClassPrivateMethod = Invocation("ClassPrivateMethod", [ClassMethod], [
    ["key", null], // PrivateName
    ["computed", false], // computed !== true
]);
export default ClassPrivateMethod;