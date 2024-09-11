import Literal from "./literal.js";
import Invocation from "../bs/invocation.js";
export const NullLiteral = Invocation("NullLiteral", [Literal]);
export default NullLiteral;