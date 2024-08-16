import bus from "./hardware/bus.js";
import loadFont from "./font/image.js";

import "./hardware/mouse.js";
import "./hardware/screen.js";
import "./hardware/speaker.js";
import "./grid/title.js";

const $ = x => document.getElementById(x);

const main = async () => {
    const image = await loadFont();
    const $pointy = $("pointy");
    const $screen = $("screen");
    bus.emit("init", { image, $pointy, $screen });

    let now = 0;
    let frame = 0;
    let dur = 0;
    let paused = false;
    bus.on("click", () => paused = !paused);
    const render = (t = 0) => {
        const d = t - now;
        if (!paused) {
            dur += d;
        }
        now = t;
        
        // Move the mouse
        bus.emit("move@mouse", dur);

        // Draw the title for now. The state tree needs to be made.
        bus.emit("draw@title", dur);

        // Draw the screen
        bus.emit("draw@screen", dur);

        frame++;
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
};

main().catch(console.error);
