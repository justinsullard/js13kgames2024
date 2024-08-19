import bus from "../hardware/bus.js";
import { colorMap } from "../hardware/screen.js";
const autocolor = {
    "½": colorMap.name,
}

const w = 49;
const h = 20;
const loglines = [];
let dirty = false;

bus.on("log@console", (x) => {
    const length = x.length ?? 0;
    if (length > w) {
        // work on splitting them later.
        // loglines.push(...x.wrap(w));
    } else if (length) {
        loglines.push(x);
    }
    while (loglines.length > h) {
        dirty = true;
        loglines.shift();
    }
});
bus.on("input@console", (label, value) => {
    // What the heck are we going to do how?
});

bus.on("draw@console", (dur) => {
    if (dirty) {
        for (let c = w * h; c--;) {
            bus.emit("del@screen", c % w, 38 + (c / w) | 0);
        }
    }
    loglines.forEach((l, i) => {
        if (typeof l === "string") {
            const color = autocolor[l[0]] ?? colorMap.text;
            bus.emit("text@screen", l, 0, 38 + i, color);
        } else if (l.draw) {
            l.draw(0, 38 + i);
        }
    });
});
