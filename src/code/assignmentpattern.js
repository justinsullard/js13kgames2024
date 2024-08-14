import Pattern from "./pattern";
export default class AssignmentPattern extends Pattern {
    left = null; // ArrayPattern, Identifier, ObjectPattern
    right = null; // Expression, Literal, Identifier
}