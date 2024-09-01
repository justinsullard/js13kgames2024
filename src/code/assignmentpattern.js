import Pattern from "./pattern.js";
export default class AssignmentPattern extends Pattern {
    left = null; // ArrayPattern, Identifier, ObjectPattern
    right = null; // Expression, Literal, Identifier
}