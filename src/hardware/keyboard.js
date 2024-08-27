import { emit, once } from "./bus.js";
import listen from "../util/listen.js";

once(
    "init",
    () => "keydown,keypress,keyup".split(",").forEach(x => listen(x, e => emit(x, e)))
);