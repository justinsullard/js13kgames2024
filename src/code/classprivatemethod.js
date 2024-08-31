import ClassMethod from "./classmethod.js";
export default class ClassPrivateMethod extends ClassMethod {
    key = null; // PrivateName
    // method cannot be "constructor"
    computed = false;
}