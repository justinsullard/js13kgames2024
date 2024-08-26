import bus from "../hardware/bus.js";
import { colorMap } from "../hardware/screen.js";
import Input from "./input.js";

const autocolor = {
    "½": colorMap.name,
}

const t = 39;
const w = 49;
const h = 20;
const loglines = [];
let dirty = false;

const cycle = () => {
    while (loglines.length > h) {
        dirty = true;
        loglines.shift();
    }
};

bus.on("log@console", (x) => {
    const length = x.length ?? 0;
    if (length > w) {
        if (typeof x === "string") {
            let words = x.split(" ");
            let l = words.shift();
            while (words.length) {
                const word = words.shift();
                if (l.length + word.length + 1 < w) {
                    l += " " + word;
                } else {
                    loglines.push(l);
                    l = word;
                }
            }
            loglines.push(l);
        }
        // work on splitting them later.
        // loglines.push(...x.wrap(w));
    } else if (length) {
        loglines.push(x);
    }
    cycle();
});
bus.on("input@console", (...x) => {
    // What the heck are we going to do how?
    loglines.push(new Input(...x));
    cycle();
});

bus.on("draw@console", (dur) => {
    if (dirty) {
        for (let c = w * h; c--;) {
            bus.emit("del@screen", c % w, t + (c / w) | 0);
        }
        dirty = false;
    }
    loglines.forEach((l, i) => {
        if (typeof l === "string") {
            const color = autocolor[l[0]] ?? colorMap.text;
            bus.emit("text@screen", l, 0, t + i, color);
        } else if (l.draw) {
            l.draw(dur, 0, t + i);
        }
    });
});
