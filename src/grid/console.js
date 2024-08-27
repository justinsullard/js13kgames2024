import { on } from "../hardware/bus.js";
import { colorMap, text, del } from "../hardware/screen.js";
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
export const log = (x) => {
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
};
export const input = (...x) => {
    // What the heck are we going to do how?
    loglines.push(new Input(...x));
    cycle();
};
export const draw = (dur) => {
    if (dirty) {
        for (let c = w * h; c--;) {
            del(c % w, t + (c / w) | 0);
        }
        dirty = false;
    }
    loglines.forEach((l, i) => {
        if (typeof l === "string") {
            const color = autocolor[l[0]] ?? colorMap.text;
            text(l, 0, t + i, color);
        } else if (l.draw) {
            l.draw(dur, 0, t + i);
        }
    });
};

on("log@console", log);
on("input@console", input);
on("draw@console", draw);
