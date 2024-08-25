import { theme } from "./screen.js";
import bus from "./bus.js";
import listen from "../util/listen.js";

const keys = {};
// bus.on("keydown", e => console.log("keydown", e));
// bus.on("keypress", e => console.log("keypress", e));
// bus.on("keyup", e => console.log("keyup", e));

bus.once("init", ({ $screen }) => {
    "keydown,keypress,keyup".split(",").forEach(x => listen(x, e => bus.emit(x, e)));
});