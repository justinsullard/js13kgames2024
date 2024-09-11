import ClassProperty from "./classproperty.js";
import Invocation from "../bs/invocation.js";
export const ClassPrivateProperty = Invocation("ClassPrivateProperty", [ClassProperty], [
    ["key", null], // PrivateName
    ["computed", false], // computed !== true
]);
export default ClassPrivateProperty;