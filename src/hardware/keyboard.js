import { emit } from "./bus.js";
import listen from "../util/listen.js";
import each from "../util/each.js";
each("keydown,keypress,keyup".split(","), x => listen(x, e => emit(x, e)));
